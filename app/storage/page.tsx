"use client";

import React from "react";
import { uploadData } from "aws-amplify/storage";
import { FileUploader } from "@aws-amplify/ui-react-storage";
import "@aws-amplify/ui-react/styles.css";

const storage = () => {
  const [file, setFile] = React.useState<File | null>(null);

  const handleChange = (event: any) => {
    setFile(event.target.files?.[0]);
  };

  const handleClick = async () => {
    try {
      if (!file) {
        return;
      }
      const result = await uploadData({
        path: `picture-submissions/${file.name}`,
        data: file,
        options: {
          onProgress: ({ transferredBytes, totalBytes }) => {
            if (totalBytes) {
              console.log(
                `Upload progress ${Math.round(
                  (transferredBytes / totalBytes) * 100
                )} %`
              );
            }
          },
        },
      }).result;
      console.log("File uploaded successfully", result.path);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleClick}>picture-submissions</button>
      <FileUploader
        acceptedFileTypes={["image/*"]}
        path="public/"
        maxFileCount={1}
        isResumable
      />
    </div>
  );
};

export default storage;
