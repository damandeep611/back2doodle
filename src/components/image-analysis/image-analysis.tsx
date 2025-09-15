"use client";
import { ApiStatus } from "@/components/api-status";
import InputPrompt from "@/components/image-analysis/InputPrompt";
import LoadingState from "@/components/image-analysis/LoadingState";
import UploadFile from "@/components/image-analysis/UploadFile";
import { analyzeImageWithGemini } from "@/lib/nano-banana";
import { X } from "lucide-react";
import { useState } from "react";

export default function ImageAnalysis() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiReady, setApiReady] = useState(false);

  const handleImageUpload = (imageUrl: string) => {
    setOriginalImage(imageUrl);
    setAnalysisResult(null);
    setError(null);
  };

  const handleAnalyzeImage = async () => {
    if (!originalImage || !prompt.trim()) {
      setError("Please upload an image and enter a prompt");
      return;
    }
    if (!apiReady) {
      setError("API is not ready. Please check your configuration");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const analysis = await analyzeImageWithGemini(
        originalImage,
        prompt.trim()
      );
      setAnalysisResult(analysis);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to analyze image. Please try again.";
      setError(errorMessage);
      console.error("Image analysis error:", err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleReset = () => {
    setOriginalImage(null);
    setAnalysisResult(null);
    setPrompt("");
    setError(null);
  };
  return (
    <div className="flex-1 relative">
      <div className=" relative grid grid-cols-1 md:grid-cols-[40%_60%] ">
        <div className="p-4 sticky top-0 h-screen">
          <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-zinc-200">
            <div className="flex items-center justify-between gap-2">
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/3d-fluency/94/notepad.png"
                alt="notepad"
              />
              <div>
                <h2 className="font-semibold">Prompt Generator</h2>
                <p className="text-xs text-zinc-500">
                  Generate Prompts and analyze images{" "}
                </p>
              </div>
            </div>
            <ApiStatus onStatusChange={setApiReady} />
          </div>

          <div className="space-y-6">
            <UploadFile onImageUpload={handleImageUpload} />
            <InputPrompt
              value={prompt}
              onChange={setPrompt}
              onSubmit={handleAnalyzeImage}
              disabled={isLoading || !originalImage || !apiReady}
            />
            {/* to show api error */}
            {error && (
              <div>
                <p className="text-sm">{error}</p>
                {error.includes("GEMINI_API_KEY") && (
                  <div>
                    <p>setup api key first</p>
                  </div>
                )}
              </div>
            )}
            {/* analyze button and reset button */}
            <div className="flex gap-3">
              <button
                onClick={handleAnalyzeImage}
                disabled={isLoading || !originalImage || !prompt.trim()}
                className=" button-analyze flex-1 px-6 py-2 rounded-lg bg-emerald-800 text-white font-medium disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? "Analyzing..." : "Analyze Image"}
              </button>
              <button
                onClick={handleReset}
                disabled={isLoading}
                className="px-6 flex items-center justify-between gap-2 border border-zinc-300 hover:border-zinc-500 text-zinc-500 hover:text-zinc-700 text-sm py-2 cursor-pointer rounded-lg  disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={16} /> Reset
              </button>
            </div>
          </div>
        </div>

        {/*--------------------------------------- Outputr result from image analysis------------------- */}
        <div className="border-l overflow-y-auto h-screen border-zinc-200 p-2">
          <div className="">
            {isLoading ? (
              <LoadingState />
            ) : analysisResult ? (
              <div className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden">
                  {originalImage && (
                    <img
                      src={originalImage || "placeholder.svg"}
                      alt="Original uploaded image"
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
                <div className="p-4 border border-gray-300 rounded-md">
                  <h3 className="font-medium mb-2">
                    AI Analysis & editing instructions
                  </h3>
                  <div className="text-sm whitespace-pre-wrap">
                    {analysisResult}
                  </div>
                </div>
              </div>
            ) : (
              originalImage && (
                <div className="aspect-video rounded-lg overflow-hidden ">
                  <img
                    src={originalImage || "/placeholder.svg"}
                    alt="Original"
                    className="w-full h-full object-contain"
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
