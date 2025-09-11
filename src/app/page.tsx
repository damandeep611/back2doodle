"use client"
import InputPrompt from "@/components/InputPrompt";
import UploadFile from "@/components/UploadFile";
import { useState } from "react";

export default function Home() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [analysisResult, setAnalysisResult] = useState<string | null>(null)
  const [error , setError] = useState<string | null>(null);

  const handleImageUpload = (imageUrl: string)=> {
    setOriginalImage(imageUrl);
    setAnalysisResult(null);
    setError(null)
  }
  return (
    <div className="min-h-screen ">
     <div className="container max-w-6xl mx-auto">
       <div className="text-center pt-8">
        <h2 className="text-2xl font-semibold">AI Image analyzer</h2>
        <p className="text-gray-700">
          Get detailed editing instructions for your images using Google Gemini
          AI
        </p>
      </div>
      {/* tools grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 mt-16">
        <div className="space-y-6">
          <UploadFile onImageUpload={handleImageUpload}/>
          <InputPrompt/>
        </div>
        <div className="mx-auto p-8 flex items-center justify-center">
          image analyzer here
        </div>
      </div>
     </div>
    </div>
  );
}
