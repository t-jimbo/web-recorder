class AudioRecorder extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      {
        name: "isRecording",
        defaultValue: 0,
        minValue: 0,
        maxValue: 1,
      },
    ];
  }

  /**
   *
   * @param inputs {Float32Array[][]}
   * @param outputs {Float32Array[][]}
   * @param parameters {Record<string, Float32Array>}
   * @returns {boolean}
   */
  process(inputs) {
    const input = inputs[0];
    const channel = input[0];

    if (channel.length >= 1) {
      this.port.postMessage({ channel });
    }

    // 継続的に録音するため
    return true;
  }
}

registerProcessor("audio-recorder", AudioRecorder);
