"use client";
import { useDropzone } from "react-dropzone";

interface Prop {
  onDrop: (files: File[]) => void;
}
export const UploaderImage = ({ onDrop }: Prop) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div
      {...getRootProps()}
      className="border border-dotted p-2 rounded-sm mt-2 cursor-pointer flex items-center justify-center"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop Your Image File Here</p>
      ) : (
        <p className="text-sm">Drop file here or click to select</p>
      )}
    </div>
  );
};
