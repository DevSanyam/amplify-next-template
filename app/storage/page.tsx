// "use client";
// import { generateClient } from "aws-amplify/data";
// import { uploadData, getUrl } from "aws-amplify/storage";
// import type { Schema } from "@/amplify/data/resource";

// const storagePage = () => {
//     return (
//         <div>
//             <h1>Storage Page</h1>
//         </div>
//     );
// };

// export default storagePage;

"use client";

// import { useState } from "react";
// import { uploadData, getUrl } from "aws-amplify/storage";

// const StoragePage = () => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [fileUrl, setFileUrl] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   // Handle file selection
//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       setSelectedFile(event.target.files[0]);
//     }
//   };

//   // Upload file function
//   const handleUpload = async () => {
//     if (!selectedFile) {
//       setError("Please select a file first.");
//       return;
//     }

//     setUploading(true);
//     setError(null);

//     try {
//       // Upload file to S3
//       const result = await uploadData({
//         data: await selectedFile.arrayBuffer(),
//         path: `uploads/${selectedFile.name}`, // File stored under "uploads/" folder
//       });

//       console.log("Upload successful:", result);

//       // Get the file URL
//       const url = await getUrl({ path: result?.path });
//       setFileUrl(url.toString());
//     } catch (e) {
//       console.error("Upload error", e);
//       setError("Failed to upload file.");
//     }

//     setUploading(false);
//   };

//   return (
//     <div className="p-6 max-w-lg mx-auto">
//       <h1 className="text-xl font-bold mb-4">AWS Amplify Storage Upload</h1>

//       {/* File Input */}
//       <input
//         type="file"
//         onChange={handleFileChange}
//         className="border p-2 w-full mb-4"
//       />

//       {/* Upload Button */}
//       <button
//         onClick={handleUpload}
//         disabled={!selectedFile || uploading}
//         className={`px-4 py-2 text-white rounded ${
//           uploading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
//         }`}
//       >
//         {uploading ? "Uploading..." : "Upload"}
//       </button>

//       {/* Display Upload Result */}
//       {fileUrl && (
//         <div className="mt-4">
//           <p className="text-green-600">File uploaded successfully!</p>
//           <a
//             href={fileUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-600 underline"
//           >
//             View File
//           </a>
//         </div>
//       )}

//       {/* Error Message */}
//       {error && <p className="text-red-500 mt-4">{error}</p>}
//     </div>
//   );
// };

// export default StoragePage;


import React from 'react';
import { uploadData } from 'aws-amplify/storage';

const storage = () => {
  const [file, setFile] = React.useState();

  const handleChange = (event:any) => {
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
      console.log('File uploaded successfully');
      
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
   
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleClick}>Upload</button>
    </div>
  );
}

export default storage;