"use client";
import { ApiStatus } from "@/components/api-status";
import InputPrompt from "@/components/image-analysis/InputPrompt";
import LoadingState from "@/components/image-analysis/LoadingState";
import UploadFile from "@/components/image-analysis/UploadFile";
import { analyzeImageWithGemini } from "@/lib/nano-banana";
import { History, Lock, PenTool, X, Clock, FileText } from "lucide-react";
import { useState } from "react";
import PromptIdeas from "../prompts/PromptIdeas";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import ReactMarkdown from "react-markdown";

export default function ImageAnalysis() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiReady, setApiReady] = useState(false);
  const [activeTab, setActiveTab] = useState("new-outputs");
  const [Imageopen, setImageOpen] = useState(false);

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
      <div className=" relative grid grid-cols-1 md:grid-cols-[45%_55%] ">
        <div className="p-4 ">
          <div className="flex items-center justify-between gap-2 pb-4 mb-2 ">
            <div className="flex items-center justify-between gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded flex items-center justify-center">
                <PenTool className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="font-semibold">Prompt Generator</h2>
                <p className="text-xs text-zinc-500">
                  Generate Prompts and analyze images{" "}
                </p>
              </div>
            </div>
            <ApiStatus onStatusChange={setApiReady} />
          </div>
          {/* input tabs  */}
          <div className="flex gap-6 border-b border-gray-200 mb-6 text-sm font-medium">
            <button className="pb-2 capitalize text-blue-600 border-b-2 border-blue-500 cursor-pointer">
              Image Analysis
            </button>
            <button className="flex items-center justify-between gap-2 pb-2 capitalize text-zinc-300">
              One click image to prompt <Lock size={14} />
            </button>
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
            <PromptIdeas />
          </div>
        </div>

        {/*--------------------------------------- Outputr result from image analysis------------------- */}
        <div className="border-l overflow-y-auto h-screen border-zinc-200 p-2">
          <div className="flex gap-6  text-sm font-medium ">
            <button
              onClick={() => setActiveTab("new-outputs")}
              className={` p-2  ${
                activeTab === "new-outputs"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-zinc-500"
              }`}
            >
              New Outputs
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex items-center justify-between gap-2 p-2  ${
                activeTab === "history"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-zinc-500"
              }`}
            >
              History <History size={16} />
            </button>
          </div>
          <div className="border-t border-zinc-200 p-2">
            {activeTab === "new-outputs" && (
              <div>
                {isLoading ? (
                  <LoadingState />
                ) : analysisResult ? (
                  <div className="space-y-4">
                    <div className="aspect-video rounded-lg overflow-hidden">
                      {originalImage && (
                        <>
                          <img
                            src={originalImage || "/placeholder.svg"}
                            alt="Original"
                            onClick={() => setImageOpen(true)}
                            className="w-full h-64 object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
                          />
                          <Lightbox
                            open={Imageopen}
                            close={() => setImageOpen(false)}
                            slides={[{ src: `${originalImage}` }]}
                            plugins={[Zoom, Fullscreen]}
                          />
                        </>
                      )}
                    </div>
                    <div className="p-4 border border-gray-200 rounded-md">
                      <h3 className="font-medium mb-2">
                        AI Analysis & editing instructions
                      </h3>
                      <div className="text-sm prose max-w-none">
                        <ReactMarkdown>{analysisResult}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                ) : (
                  originalImage && (
                    <div className="aspect-video rounded-lg overflow-hidden ">
                      <img
                        src={originalImage || "/placeholder.svg"}
                        alt="Original"
                        onClick={() => setImageOpen(true)}
                        className="w-full h-64 object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
                      />
                      <Lightbox
                        open={Imageopen}
                        close={() => setImageOpen(false)}
                        slides={[{ src: `${originalImage}` }]}
                        plugins={[Zoom, Fullscreen]}
                      />
                    </div>
                  )
                )}
              </div>
            )}

            {activeTab === "history" && (
              <div className="flex items-center justify-center h-64">
                <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200 w-full">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    No History Yet
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Your image analysis history will appear here
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                    <FileText className="w-4 h-4" />
                    <span>Start analyzing images to build your history</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
