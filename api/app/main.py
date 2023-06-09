import wave

import numpy as np
import tornado.websocket

SAMPLE_SIZE = 2
SAMPLE_RATE = 48000
PATH = './output.wav'


class WebSocketHandler(tornado.websocket.WebSocketHandler):
    def open(self):
        self.voice = []
        print("opened")

    def on_message(self, message):
        self.voice.append(np.frombuffer(message, dtype='float32'))

    def on_close(self):
        v = np.array(self.voice)
        v.flatten()

        # バイナリに16ビットの整数に変換して保存
        arr = (v * 32767).astype(np.int16)
        with wave.open(PATH, 'wb') as wf:
            wf.setnchannels(1)
            wf.setsampwidth(SAMPLE_SIZE)
            wf.setframerate(SAMPLE_RATE)
            wf.writeframes(arr.tobytes('C'))

        self.voice.clear()
        print("closed")

    def check_origin(self, origin):
        # NOTE: ローカルで動かすだけなので
        return True


app = tornado.web.Application([
    (r"/websocket", WebSocketHandler)
])

if __name__ == "__main__":
    app.listen(8000)
    print("listening...")
    tornado.ioloop.IOLoop.instance().start()
