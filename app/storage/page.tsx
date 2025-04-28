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
import { uploadData, getUrl, list } from "aws-amplify/storage";
import { FileUploader } from "@aws-amplify/ui-react-storage";
import "@aws-amplify/ui-react/styles.css";

const StoragePage = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [fileUrl, setFileUrl] = React.useState<string | null>(null);
  const [fileList, setFileList] = React.useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    try {
      if (!file) return;

      const result = await uploadData({
        path: `picture-submissions/${file.name}`,
        data: file,
        options: {
          onProgress: ({ transferredBytes, totalBytes }) => {
            if (totalBytes) {
              console.log(
                `Upload progress: ${Math.round(
                  (transferredBytes / totalBytes) * 100
                )}%`
              );
            }
          },
        },
      }).result;

      console.log("File uploaded successfully", result.path);
      alert("Upload successful!");
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  const handleGetUrl = async () => {
    try {
      const result = await getUrl({
        path: "picture-submissions/13891.jpg",
      });
      console.log("Signed URL:", result.url);
      setFileUrl(result.url.toString());
    } catch (error) {
      console.error("Error getting URL:", error);
    }
  };

  const handleListFiles = async () => {
    try {
      const result = await list({
        path: "picture-submissions/",
      });
      console.log("Listed files:", result.items);

      const fileNames = result.items.map((item) => item.path);
      setFileList(fileNames);
    } catch (error) {
      console.error("Error listing files:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Storage Page</h1>

      {/* Upload section */}
      <input type="file" onChange={handleChange} className="mb-2" />
      <button onClick={handleUpload} className="px-4 py-2 bg-blue-500 text-white rounded mr-2">
        Upload to picture-submissions
      </button>

      {/* Get URL section */}
      <button onClick={handleGetUrl} className="px-4 py-2 bg-green-500 text-white rounded mr-2">
        Get Download Link
      </button>

      {/* List files section */}
      <button onClick={handleListFiles} className="px-4 py-2 bg-purple-500 text-white rounded">
        List Files
      </button>

      {/* Show download link */}
      {fileUrl && (
        <div className="mt-4">
          <a href={fileUrl} target="_blank" rel="noreferrer" className="text-blue-700 underline">
            Open Downloaded File
          </a>
        </div>
      )}

      {/* Show listed files */}
      {fileList.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Files in picture-submissions:</h2>
          <ul className="list-disc pl-6">
            {fileList.map((filePath, index) => (
              <li key={index}>{filePath}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Optionally: FileUploader UI component */}
      <div className="mt-8">
        <FileUploader
          acceptedFileTypes={["image/*"]}
          path="public/"
          maxFileCount={1}
          isResumable
        />
      </div>
    </div>
  );
};

export default StoragePage;
