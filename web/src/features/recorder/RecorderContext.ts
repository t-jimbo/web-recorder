import { createContext } from "react";

export type RecorderContextValue = {
  isRecording: boolean;
  onStart: () => void;
  onStop: () => void;
};

export const RecorderContext = createContext<RecorderContextValue>({
  isRecording: false,
  onStart: () => null,
  onStop: () => null,
});
