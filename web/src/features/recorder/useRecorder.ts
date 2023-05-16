import { useCallback, useEffect, useState } from "react";

/**
 * mediaStreamを取得して、初期化したMediaRecorderを返す
 */
const init = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  if (!MediaRecorder.isTypeSupported("audio/webm")) {
    console.warn("audio/webm is not supported");
    return null;
  }
  return new MediaRecorder(stream, {
    mimeType: "audio/webm",
  });
};

export const useRecorder = () => {
  const [recorder, setRecorder] = useState<MediaRecorder | null>();

  useEffect(() => {
    (async () => setRecorder(await init()))();
  }, []);

  const startRecording = useCallback(
    (send: (data: Blob) => void) => {
      if (!recorder) return;
      recorder.start();

      recorder.addEventListener("dataavailable", async (e) => {
        send(await e.data);
      });
    },
    [recorder]
  );

  const stopRecording = useCallback(() => {
    if (!recorder) return;
    recorder.stop();
  }, [recorder]);

  return {
    startRecording,
    stopRecording,
  };
};

/**
 * mediaStreamを取得して、初期化したAudioContextを返す
 * TODO: どっちかに統一する
 */
const initWebAudio = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  if (!MediaRecorder.isTypeSupported("audio/webm")) {
    console.warn("audio/webm is not supported");
    return null;
  }

  const context = new AudioContext();
  const input = context.createMediaStreamSource(stream);
  const processor = context.createScriptProcessor(2048, 1, 1);

  return {
    context,
    input,
    processor,
  };
};

export const useWebAudioRecorder = () => {
  const [webAudio, setWebAudio] = useState<{
    context: AudioContext;
    input: MediaStreamAudioSourceNode;
    processor: ScriptProcessorNode;
  } | null>();

  useEffect(() => {
    (async () => setWebAudio(await initWebAudio()))();
  }, []);

  const startRecording = useCallback(
    (send: (data: ArrayBufferLike) => void) => {
      if (!webAudio) return;
      const { context, input, processor } = webAudio;

      input.connect(processor);
      processor.connect(context.destination);
      processor.onaudioprocess = (e) => {
        const voice = e.inputBuffer.getChannelData(0);
        send(voice.buffer); // websocketで送る
      };
    },
    [webAudio]
  );

  const stopRecording = useCallback(() => {
    if (!webAudio) return;
    const { input, processor } = webAudio;

    input.disconnect(processor);
    processor.disconnect();
  }, [webAudio]);

  return {
    startRecording,
    stopRecording,
  };
};
