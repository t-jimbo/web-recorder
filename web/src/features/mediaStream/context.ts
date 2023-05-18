import { createContext } from "react";

export type MediaStreamRecorderContextValue = {
  startRecording: () => void;
  stopRecording: () => void;
  pauseRecording?: () => void;
  resumeRecording?: () => void;
  isRecording: boolean;
  src: string;
};

export const MediaStreamRecorderContext =
  createContext<MediaStreamRecorderContextValue>({
    startRecording: () => null,
    stopRecording: () => null,
    isRecording: false,
    src: "",
  });
