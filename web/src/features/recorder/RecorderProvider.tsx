import { RecorderContext } from "./RecorderContext.ts";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";

export type RecorderProviderProps = PropsWithChildren;

export const RecorderProvider: React.FC<RecorderProviderProps> = ({
  children,
}) => {
  const [recorder, setRecorder] = useState<{
    context: AudioContext;
    input: MediaStreamAudioSourceNode;
    processor: ScriptProcessorNode;
  } | null>();

  useEffect(() => {
    // TODO: hooksに切り出す
    (async () => setRecorder(await init()))();
  }, []);

  const [conn, setConn] = useState<WebSocket>();
  const [isRecording, setIsRecording] = useState(false);

  const handlerStart = () => {
    const conn = new WebSocket("ws://localhost:8000/websocket");
    setConn(conn);

    if (conn.readyState === WebSocket.CONNECTING) {
      console.log("websocket is connecting...");
    } else if (conn.readyState !== WebSocket.OPEN) {
      console.warn("websocket is closed. status: ", conn.readyState);
      return;
    }

    if (!recorder) {
      return;
    }

    const { context, input, processor } = recorder;

    // 書き込み処理。TODO: 解読する
    input.connect(processor);
    processor.connect(context.destination);
    processor.onaudioprocess = (e) => {
      if (conn.readyState === WebSocket.OPEN) {
        const voice = e.inputBuffer.getChannelData(0);
        conn.send(voice.buffer); // websocketで送る
      }
    };

    setIsRecording(true);
  };

  const handleStop = useCallback(() => {
    if (conn?.readyState === WebSocket.OPEN) {
      conn?.close();
    }

    setIsRecording(false);
  }, [conn]);

  return (
    <RecorderContext.Provider
      value={{
        isRecording,
        onStart: handlerStart,
        onStop: handleStop,
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
