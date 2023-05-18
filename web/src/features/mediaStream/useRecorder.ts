import { useCallback, useState } from "react";

/**
 * mediaStreamを取得して、初期化したMediaRecorderを返す
 */
export const useRecorder = () => {
  const [recorder, setRecorder] = useState<MediaRecorder | null>();
  const [src, setSrc] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = useCallback(async (send: (data: Blob) => void) => {
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
      setSrc(URL.createObjectURL(e.data));
    });

    recorder.addEventListener("stop", (e) => {
      console.log("stopped caused by", e);
      stream.getTracks().forEach((track) => track.stop());
    });

    setIsRecording(true);
  }, []);

  const stopRecording = useCallback(() => {
    if (!recorder) return;
    recorder.stop();

    setIsRecording(false);
  }, [recorder]);

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
