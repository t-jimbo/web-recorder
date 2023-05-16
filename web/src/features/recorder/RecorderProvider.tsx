import { RecorderContext } from "./RecorderContext.ts";
import { PropsWithChildren, useCallback, useState } from "react";
import { useWebAudioRecorder as useRecorder } from "./useRecorder.ts";

export type RecorderProviderProps = PropsWithChildren;

export const RecorderProvider: React.FC<RecorderProviderProps> = ({
  children,
}) => {
  const [conn, setConn] = useState<WebSocket>();
  const [isRecording, setIsRecording] = useState(false);

  const { startRecording, stopRecording } = useRecorder();

  const handlerStart = () => {
    const conn = new WebSocket("ws://localhost:8000/websocket");
    setConn(conn);

    if (conn.readyState === WebSocket.CONNECTING) {
      console.log("websocket is connecting...");
    } else if (conn.readyState !== WebSocket.OPEN) {
      console.warn("websocket is closed. status: ", conn.readyState);
      return;
    }

    startRecording((data) => {
      if (conn.readyState === WebSocket.OPEN) {
        conn.send(data);
      }
    });

    setIsRecording(true);
  };

  const handleStop = useCallback(async () => {
    stopRecording();

    if (conn?.readyState === WebSocket.OPEN) {
      console.log("closing websocket");
      setTimeout(() => {
        // FIXME: recorderのstop→conn.send→conn.closeとしたいため仮で1sec待つ
        conn?.close();
      }, 1000);
    }

    setIsRecording(false);
  }, [conn, stopRecording]);

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
