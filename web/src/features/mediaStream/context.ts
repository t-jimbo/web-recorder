import { createContext } from "react";

export type MediaStreamRecorderContextValue = {
  startRecording: () => void;
  stopRecording: () => void;
  pauseRecording?: () => void;
  resumeRecording?: () => void;
  isRecording: boolean;
  src:
    | {
        url: string;
        type: string;
      }
    | undefined;
};

export const MediaStreamRecorderContext =
  createContext<MediaStreamRecorderContextValue>({
    startRecording: () => null,
    stopRecording: () => null,
    isRecording: false,
    src: undefined,
  });
