import { RecorderContext } from "./RecorderContext.ts";
import { PropsWithChildren, useEffect, useState } from "react";

export type RecorderProviderProps = PropsWithChildren;

export const RecorderProvider: React.FC<RecorderProviderProps> = ({
  children,
}) => {
  const [recorder, setRecorder] = useState<MediaRecorder | null>();
  const [isRecording, setIsReconding] = useState(false);
  const [src, setSrc] = useState<string>();

  useEffect(() => {
    (async () => setRecorder(await init()))();
  }, []);
  if (!recorder) return <div>audio/webm is not supported</div>;

  const handlerStart = () => {
    recorder.start();
    setIsReconding(true);
  };

  const handleStop = () => {
    recorder.stop();
    setIsReconding(false);
  };

  recorder.addEventListener("dataavailable", (e) => {
    setSrc(URL.createObjectURL(e.data));
  });

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
  return new MediaRecorder(stream, {
    mimeType: "audio/webm",
  });
};
