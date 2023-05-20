const bucketName = import.meta.env.VITE_GCS_BUCKET_NAME;
const accessToken = import.meta.env.VITE_GCS_ACCESS_TOKEN;
export const useUploadGCS = () => {
  const handleUpload = (file: File) => {
    const reader = new FileReader();

    reader.addEventListener("load", async (e) => {
      const bytes = e.target?.result;
      const url = `https://www.googleapis.com/upload/storage/v1/b/${bucketName}/o?uploadType=media&name=${file.name}`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": file.type,
          Authorization: `Bearer ${accessToken}`,
        },
        body: bytes,
      });
      const json = await res.json();
      console.log(json);
    });

    reader.readAsArrayBuffer(file);
  };

  return {
    handleUpload,
  };
};
