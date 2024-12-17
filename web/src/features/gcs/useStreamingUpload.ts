import { useState } from "react";

export const useStreamingUpload = () => {
  const [uri, setUri] = useState(
    "https://www.googleapis.com/upload/storage/v1/b/streaming-upload/o?uploadType=resumable&name=sample.mp3&upload_id=ADPycdvhzS0Jp89EexOVnFK_cHJiqogKdE6ypNHnjKXqPLZVzgEda4A7kNeGCqj9xOBGBT8KOTr2JFnexn9JhyWmdhl3Iy22N557"
  );
  const [firstByte] = useState(0);

  const init = async (filename: string) => {
    const baseURL = "https://www.googleapis.com";
    const bucketName = import.meta.env.VITE_GCS_BUCKET_NAME;

    const url = new URL(`upload/storage/v1/b/${bucketName}/o`, baseURL);
    const params = {
      uploadType: "resumable",
      name: filename,
    };
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GCS_ACCESS_TOKEN}`,
      },
      // jsonでメタデータも送れる
    });
    const location = res.headers.get("location");
    if (!location) {
      const json = await res.json();
      console.log(json);
      console.error("location is null");
      return;
    }
    setUri(location);
    console.log(location);
  };

  const cancelUpload = async () => {
    console.log(uri);
    // レスポンスは499が返る
    const res = await fetch(uri, {
      method: "DELETE",
    });
    console.log(res);
  };

  const handleUpload = async (chunk: File, isCompleted = false) => {
    const reader = new FileReader();

    reader.addEventListener("load", async (e) => {
      const bytes = e.target?.result;
      const lastByte = chunk.size - firstByte - 1;

      const res = await fetch(uri, {
        method: "PUT",
        headers: {
          "Content-Length": chunk.size.toString(), // バイト数、256KiBの倍数
          "Content-Range": `bytes ${firstByte}-${lastByte}/${
            isCompleted ? lastByte : "*"
          }`,
        },
        body: bytes,
      });
      const json = await res.json();
      console.log(json);
    });

    reader.readAsArrayBuffer(chunk);
  };

  return {
    init,
    handleUpload,
    cancelUpload,
  };
};
