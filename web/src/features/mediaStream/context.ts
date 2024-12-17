import { createContext } from "react";

export type MediaStreamRecorderContextValue = {
  startRecording: () => void;
  stopRecording: () => void;
  pauseRecording?: () => void;
  resumeRecording?: () => void;
  isRecording: boolean;
  src:
    | {
        size: number;
        url: string;
        type: string;
      }
    | undefined;
  recorder: MediaRecorder | undefined | null;
};

export const MediaStreamRecorderContext =
  createContext<MediaStreamRecorderContextValue>({
    startRecording: () => null,
    stopRecording: () => null,
    isRecording: false,
    src: undefined,
    recorder: undefined,
  });
