import { RecorderContext } from "./RecorderContext.ts";
import { PropsWithChildren, useCallback, useState } from "react";
import { useRecorder } from "./useRecorder.ts";

export type RecorderProviderProps = PropsWithChildren;

export const RecorderProvider: React.FC<RecorderProviderProps> = ({
  children,
}) => {
  const [conn, setConn] = useState<WebSocket>();
  const [isRecording, setIsRecording] = useState(false);

  const { webAudio } = useRecorder();

  const handlerStart = () => {
    const conn = new WebSocket("ws://localhost:8000/websocket");
    setConn(conn);

    if (conn.readyState === WebSocket.CONNECTING) {
      console.log("websocket is connecting...");
    } else if (conn.readyState !== WebSocket.OPEN) {
      console.warn("websocket is closed. status: ", conn.readyState);
      return;
    }

    if (!webAudio) {
      return;
    }

    const { context, input, processor } = webAudio;

    // recorder.start()

    // 書き込み処理。
    input.connect(processor);
    processor.connect(context.destination);
    processor.onaudioprocess = (e) => {
      if (conn.readyState === WebSocket.OPEN) {
        const voice = e.inputBuffer.getChannelData(0);
        conn.send(voice.buffer); // websocketで送る
      }
    };

    // recorder.addEventListener("dataavailable", async (e) => {
    //   if (conn.readyState === WebSocket.OPEN) {
    //     // websocketで送る。データ型はArrayBuffer？
    //     console.log("sending");
    //     conn.send(await e.data.arrayBuffer());
    //   }
    // });

    setIsRecording(true);
  };

  const handleStop = useCallback(async () => {
    // recorder?.stop();
    if (conn?.readyState === WebSocket.OPEN) {
      console.log("closing websocket");
      setTimeout(() => {
        // FIXME: recorderのstop→conn.send→conn.closeとしたいため仮で1sec待つ
        conn?.close();
      }, 1000);
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
