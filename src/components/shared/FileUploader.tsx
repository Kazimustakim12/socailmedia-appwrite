import React, { useCallback, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { Button } from "../ui/button";

type FileUploaderProps = {
  filedChange: (FILES: File[]) => void;
  mediaUrl: string;
};

const FileUploader = ({ filedChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      // Do something with the files
      setFile(acceptedFiles);
      filedChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".png", ".jpg", ".svg"],
    },
  });
  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-dark-2 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer " />
      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10 ">
            <img src={fileUrl} alt="img" className="file_uploader-img" />
          </div>
          <p className="w-full file_uploader-label">
            Click or darg photo to replace
          </p>
        </>
      ) : (
        <div className="file_uploader-box">
          <img
            src="/assets/icons/file-upload.svg"
            alt="file-upload-img"
            width={96}
            height={77}
          />
          <h3 className="base-medium text-light-2 mb-2 mt-6 ">
            Drag 'n' Drop here
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>
          <Button className="shad-button_dark_4">Select from Computer</Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
