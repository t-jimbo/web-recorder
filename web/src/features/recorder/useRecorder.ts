import { useEffect, useState } from "react";

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
  const processor = context.createScriptProcessor(1024, 1, 1);

  return {
    context,
    input,
    processor,
  };
};

export const useRecorder = () => {
  const [recorder, setRecorder] = useState<MediaRecorder | null>();

  useEffect(() => {
    (async () => setRecorder(await init()))();
  }, []);

  const [webAudio, setWebAudio] = useState<{
    context: AudioContext;
    input: MediaStreamAudioSourceNode;
    processor: ScriptProcessorNode;
  } | null>();

  useEffect(() => {
    (async () => setWebAudio(await initWebAudio()))();
  }, []);

  return {
    recorder,
    webAudio,
  };
};
