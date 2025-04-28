// "use client";

// import React from "react";
// import { uploadData, getUrl } from "aws-amplify/storage";
// import { FileUploader, StorageImage } from "@aws-amplify/ui-react-storage";
// import "@aws-amplify/ui-react/styles.css";

// const storage = () => {
//   const [file, setFile] = React.useState<File | null>(null);

//   const linkToStorageFile = async () => {
//     const linkTS = await getUrl({
//       path: "picture-submissions/13891.jpg",
//       // Alternatively, path: ({identityId}) => `album/${identityId}/1.jpg`
//     });
//     console.log("signed URL: ", linkTS.url);
//     console.log("URL expires at: ", linkTS.expiresAt);
//   };

//   const handleChange = (event: any) => {
//     setFile(event.target.files?.[0]);
//   };

//   const handleClick = async () => {
//     try {
//       if (!file) {
//         return;
//       }
//       const result = await uploadData({
//         path: `picture-submissions/${file.name}`,
//         data: file,
//         options: {
//           onProgress: ({ transferredBytes, totalBytes }) => {
//             if (totalBytes) {
//               console.log(
//                 `Upload progress ${Math.round(
//                   (transferredBytes / totalBytes) * 100
//                 )} %`
//               );
//             }
//           },
//         },
//       }).result;
//       console.log("File uploaded successfully", result.path);
//     } catch (error) {
//       console.log("Error uploading file: ", error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleChange} />
//       <button onClick={handleClick}>picture-submissions</button>
//       <FileUploader
//         acceptedFileTypes={["image/*"]}
//         path="public/"
//         maxFileCount={1}
//         isResumable
//       />
//       {/* <StorageImage alt="cat" path="picture-submissions/13891.jpg" /> */}
//       <button onClick={linkToStorageFile}>get link</button> 
//     </div>
//   );
// };

// export default storage;
"use client";

import React from "react";
import { uploadData, getUrl } from "aws-amplify/storage";
import { FileUploader } from "@aws-amplify/ui-react-storage";
import "@aws-amplify/ui-react/styles.css";

const StoragePage = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [signedUrl, setSignedUrl] = React.useState<string | null>(null); // 💬 For displaying URL
  const [fileName, setFileName] = React.useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleClick = async () => {
    if (!file) return;
    try {
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

  const linkToStorageFile = async () => {
    try {
      if (!fileName) {
        alert("Upload a file first!");
        return;
      }
      const linkTS = await getUrl({
        path: `picture-submissions/${fileName}`, // use uploaded file name
      });
      console.log("signed URL: ", linkTS.url);
      setSignedUrl(linkTS.url.toString()); // Save signed URL in state
    } catch (error) {
      console.error("Error getting signed URL:", error);
    }
  };

  return (
    <div>
      <h1>Storage Upload + Get Link</h1>

      <input type="file" onChange={handleChange} />
      <button onClick={handleClick}>Upload to picture-submissions</button>

      <FileUploader
        acceptedFileTypes={["image/*"]}
        path="public/"
        maxFileCount={1}
        isResumable
      />

      <button onClick={linkToStorageFile}>Get File Link</button>

      {/* Show Link if available */}
      {signedUrl && (
        <div style={{ marginTop: "20px" }}>
          <a href={signedUrl} target="_blank" rel="noreferrer">
            {fileName}
          </a>
        </div>
      )}
    </div>
  );
};

export default StoragePage;
