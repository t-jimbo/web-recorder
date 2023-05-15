import { RecorderContext } from "./RecorderContext.ts";
import { PropsWithChildren, useEffect, useState } from "react";

export type RecorderProviderProps = PropsWithChildren;

export const RecorderProvider: React.FC<RecorderProviderProps> = ({
  children,
}) => {
  const [recorder, setRecorder] = useState<{
    context: AudioContext;
    input: MediaStreamAudioSourceNode;
    processor: ScriptProcessorNode;
  } | null>();
  const [isRecording, setIsReconding] = useState(false);
  const [src] = useState<string>();

  useEffect(() => {
    (async () => setRecorder(await init()))();
  }, []);
  if (!recorder) return <div>audio/webm is not supported</div>;

  const handlerStart = () => {
    const conn = new WebSocket("ws://localhost:8000/websocket");

    if (conn.readyState !== 1) return;

    const { context, input, processor } = recorder;

    input.connect(processor);
    processor.connect(context.destination);

    processor.onaudioprocess = function (e) {
      const voice = e.inputBuffer.getChannelData(0);
      conn.send(voice.buffer); // websocketで送る
    };

    setIsReconding(true);
  };

  const handleStop = () => {
    setIsReconding(false);
  };

  return (
    <RecorderContext.Provider
      value={{
        isRecording,
        onStart: handlerStart,
        onStop: handleStop,
        srcURL: src,
      }}
    >
      {children}
    </RecorderContext.Provider>
  );
};

/**
 * mediaStreamを取得して、初期化したMediaRecorderを返す
 */
const init = async () => {
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
