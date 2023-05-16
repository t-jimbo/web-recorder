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
 * web audio API ver
 */
const initWebAudio = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  if (!MediaRecorder.isTypeSupported("audio/webm")) {
    console.warn("audio/webm is not supported");
    return null;
  }

  const context = new AudioContext();
  await context.audioWorklet.addModule("audio-recorder.js"); // <3>

  const input = context.createMediaStreamSource(stream); // <4>
  const worklet = new AudioWorkletNode(context, "audio-recorder"); // <5>

  worklet.port.start();

  // mediaStream, worklet, スピーカーを接続します。なお、workletは何も出力しないのでスピーカーから音声は再生されない
  input.connect(worklet); // NOTE: おそらくこれを先にやらないとworkletProcessorのchannelがundefinedになる
  worklet.connect(context.destination);

  return {
    context,
    input,
    worklet,
  };
};

export const useWebAudioRecorder = () => {
  const [webAudio, setWebAudio] = useState<{
    context: AudioContext;
    input: MediaStreamAudioSourceNode;
    worklet: AudioWorkletNode;
  } | null>();

  useEffect(() => {
    (async () => setWebAudio(await initWebAudio()))();
  }, []);

  const startRecording = useCallback(
    (send: (data: ArrayBufferLike) => void) => {
      if (!webAudio) return;
      const { context, worklet } = webAudio;

      // sendを受け取らないといけないのでここにある
      worklet.port.addEventListener("message", (event) => {
        // wsでサーバーに送る
        send(event.data.channel as Float32Array); // FIXME: 型なんとかする
      });

      const parameter = worklet.parameters.get("isRecording");
      if (parameter) parameter.setValueAtTime(1, context.currentTime);
    },
    [webAudio]
  );

  const stopRecording = useCallback(() => {
    if (!webAudio) return;
    const { context, worklet } = webAudio;

    const parameter = worklet.parameters.get("isRecording");
    if (parameter) parameter.setValueAtTime(0, context.currentTime);
  }, [webAudio]);

  return {
    startRecording,
    stopRecording,
  };
};
