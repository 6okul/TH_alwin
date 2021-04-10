import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/api/private/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      const { message } = res.data;

      message && setMessage(message);
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
    }
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  return (
    <div className="mt-3">
      {message ? <h5>{message}</h5> : null}
      <form onSubmit={onSubmit}>
        <div className="mb-2">
          <input type="file" onChange={onChange} />
        </div>
        <input type="submit" value="Upload" className="btn btn-primary mt-4" />
      </form>
    </div>
  );
};

export default FileUpload;
