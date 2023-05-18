import { useRecorder } from "./useRecorder.ts";
import { MediaStreamRecorderContext } from "./context.ts";
import { PropsWithChildren } from "react";

export type MediaStreamRecorderProviderProps = PropsWithChildren;

export const MediaStreamRecorderProvider: React.FC<
  MediaStreamRecorderProviderProps
> = ({ children }) => {
  const {
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    isRecording,
    src,
  } = useRecorder();

  return (
    <MediaStreamRecorderContext.Provider
      value={{
        startRecording: () => {
          startRecording((data) => {
            console.log(data);
          });
        },
        stopRecording,
        pauseRecording,
        resumeRecording,
        isRecording,
        src,
      }}
    >
      {children}
    </MediaStreamRecorderContext.Provider>
  );
};
