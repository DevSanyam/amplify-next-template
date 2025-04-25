"use client";

import React from "react";
import { uploadData } from "aws-amplify/storage";
import { FileUploader } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';

const storage = () => {
  const [file, setFile] = React.useState();

  const handleChange = (event: any) => {
    setFile(event.target.files?.[0]);
  };

  const handleClick = () => {
    try {
      if (!file) {
        return;
      }
      uploadData({
        path: `picture-submissions/${file}`,
        data: file,
      });
      console.log("File uploaded successfully");
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleClick}>picture-submissions</button>
      <FileUploader
      acceptedFileTypes={['image/*']}
      path="public/"
      maxFileCount={1}
      isResumable
    />
    </div>
  );
};

export default storage;
