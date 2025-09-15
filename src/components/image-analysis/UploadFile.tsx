"use client"
import { ImageIcon, Upload, X } from 'lucide-react';
import React, { useCallback, useState } from 'react'

interface ImageUploadProps {
  onImageUpload: (imageUrl: string)=> void;
}
export default function UploadFile({onImageUpload}:ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleFiles = useCallback(
  (files: FileList | null) => {
    if(!files || files.length === 0) return

    const file  = files[0]
    if(!file.type.startsWith("image/")){
      alert("Please Upload an image file")
      return
    }
    //check file size (max 10mb)
    if(file.size > 10 * 1024 * 1024){
      alert("File size must be less than 10mb")
      return
    }
    const reader = new FileReader()
    reader.onload = (e)=> {
      const result = e.target?.result as string
      setUploadedImage(result)
      onImageUpload(result)
    }
    reader.readAsDataURL(file)
  },
  [onImageUpload]
)

const handleInputChange = useCallback(
  (e:React.ChangeEvent<HTMLInputElement>)=> {
    handleFiles(e.target.files)
  },
  [handleFiles]
)

//remove uploaded image 
const removeUploadedImage = ()=> {
  setUploadedImage(null)
}
  return (
    <div className="w-full ">
      <label className="text-sm font-medium text-zinc-700 ">Upload Image</label>
      {uploadedImage ? (
        <div className="relative border-2 border-dashed border-green-300  rounded-lg p-2 my-2">
          <div className="relative">
            <img
              src={uploadedImage || "placeholder.svg"}
              alt="Uploaded"
              className="w-full h-52 object-cover rounded-lg"
            />
            <button
              onClick={removeUploadedImage}
              className="absolute top-2 right-2 p-1 rounded-full bg-red-600 text-white cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
          <p className="text-sm mt-2 text-center">
            Image uploaded successfully
          </p>
        </div>
      ) : (
        <div
          className={`relative border-2 border-dashed border-gray-300 hover:border-gray-500 rounded-lg p-8 text-center cursor-pointer`}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 rounded-full">
              {dragActive ? <Upload size={14} /> : <ImageIcon size={14} />}
            </div>
            <div className="space-y-2">
              <p className="text-lg font-medium text-zinc-500">
                {dragActive ? "Drop your image here" : "Upload an image"}
              </p>
              <p className="text-sm text-zinc-400">
                Drag and drop or click to browse <br /> Supports JPG, PNG, WebP
                (max10mb)
              </p>
            </div>
            <button
              type="button"
              className=" bg-blue-500 text-white hover:bg-emerald-900 px-4 py-1 rounded-md font-medium "
            >
              Choose File
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
