import { WebAudioRecorder } from "../features/recorder/WebAudioRecorder.tsx";
import { MediaStreamRecorder } from "../features/mediaStream/MediaStreamRecorder.ts";

const Recorder: React.FC = () => {
  return (
    <div>
      <WebAudioRecorder />
      <MediaStreamRecorder />
    </div>
  );
};

export default Recorder;
