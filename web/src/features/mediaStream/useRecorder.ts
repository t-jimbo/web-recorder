import { useCallback, useState } from "react";

/**
 * mediaStreamを取得して、初期化したMediaRecorderを返す
 */
export const useRecorder = () => {
  const [recorder, setRecorder] = useState<MediaRecorder | null>();
  const [src, setSrc] = useState<{ url: string; type: string }>();
  const [isRecording, setIsRecording] = useState(false);
  const [intervalID, setIntervalID] = useState<number>();

  const startRecording = useCallback(
    async (send: (data: Blob) => void) => {
      if (isRecording) return;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setRecorder(recorder);

      if (!recorder) {
        console.error("recorder is null");
        return;
      }
      recorder.start();

      recorder.addEventListener("dataavailable", (e) => {
        send(e.data);
        setSrc({
          url: URL.createObjectURL(e.data),
          type: e.data.type,
        });
      });

      recorder.addEventListener("stop", (e) => {
        console.log("stopped caused by", e);
        stream.getTracks().forEach((track) => track.stop());
      });

      setIsRecording(true);
      // 一秒おきに本当に録音できているかstateをチェックする
      const id = setInterval(() => {
        setIsRecording(recorder.state === "recording");
      }, 1000);
      setIntervalID(id);
    },
    [isRecording]
  );

  const stopRecording = useCallback(() => {
    if (!recorder || !isRecording) return;
    recorder.stop();

    setIsRecording(false);
    clearInterval(intervalID);
  }, [recorder, isRecording, intervalID]);

  /**
   * 一時停止ができるっぽいので試してみたけどよくわからん
   */
  const pauseRecording = useCallback(() => {
    if (!recorder) return;
    recorder.pause();
    recorder.requestData();
    setIsRecording(false);
  }, [recorder]);

  const resumeRecording = useCallback(() => {
    if (!recorder) return;
    recorder.resume();

    setIsRecording(true);
  }, [recorder]);

  return {
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    src,
    isRecording,
  };
};
