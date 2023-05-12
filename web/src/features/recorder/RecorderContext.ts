import { createContext } from "react";

export type RecorderContextValue = {
  isRecording: boolean;
  onStart: () => void;
  onStop: () => void;
  srcURL: string | undefined;
};

export const RecorderContext = createContext<RecorderContextValue>({
  isRecording: false,
  onStart: () => null,
  onStop: () => null,
  srcURL: undefined,
});
