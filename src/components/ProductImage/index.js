import React, { useEffect, useRef, useState } from "react";
import { getDownloadUrl, uploadImage } from "../../firebase/utils";

export const ProductImage = ({ id }) => {
  const fileInput = useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadProgress, setUpload] = useState(0);

  useEffect(() => {
    getDownloadUrl(id).then((url) => !!url && setImageUrl(url));
  }, [id]);

  const fileChange = async (files) => {
    const ref = await uploadImage(id, files[0], updateProgress);
    const downloadUrl = await ref.getDownloadURL();
    setImageUrl(downloadUrl);
  };

  const updateProgress = (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setUpload(progress);
  };

  return (
    <div className="four wide column profile-image">
      <img
        className="ui image"
        src={imageUrl || "/profile-placeholder.png"}
        alt="profile"
      />
      <input
        className="file-input"
        type="file"
        accept=".png,.jpg"
        ref={fileInput}
        onChange={(e) => fileChange(e.target.files)}
      />
      <progress
        style={{ width: "100%" }}
        max="100"
        value={uploadProgress}
      ></progress>
      <button
        className="ui grey button upload-button"
        onClick={() => fileInput.current.click()}
      >
        Upload Photo
      </button>
    </div>
  );
};
