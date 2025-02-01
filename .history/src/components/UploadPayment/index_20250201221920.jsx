import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export const UploadPayment = ({ transactionId }) => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/upload-image`, formData)
      .then((res) => {
        console.log(res);
        setUrl(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (file) {
      handleUpload();
    }
  }, [file]);

  const handleButtonUpload = () => {
    try {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/transaction/${transactionId}`,
          {
            proof_payment_url: url,
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleButtonUpload}>Upload</button>
    </div>
  );
};
