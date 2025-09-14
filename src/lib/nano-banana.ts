
interface GeminiImageRequest {
  prompt: string;
  imageData: string
}

interface GeminiAnalysisResponse {
  analysis: string;
  note: string
}

export async function analyzeImageWithGemini(imageDataUrl: string, prompt: string):Promise<string>{
  try{
    //convert data url to base64
    const base64Data = imageDataUrl.split(",")[1]
    const mimeType = imageDataUrl.split(";")[0].split(":")[1]

    const response = await fetch("/api/nano-banana", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt,
        ImageData: base64Data,
        mimeType,
      })
    })
    if(!response.ok){
      const errorData = await response.json()
      throw new Error(errorData.error || `API request failed: ${response.statusText}`)
    }
    const result: GeminiAnalysisResponse = await response.json();
    if(!result.analysis){
      throw new Error("NO analaysis returned from API")
    }
    return result.analysis
  }catch(error){
    console.error("Gemini API error:", error)
    throw new Error(error instanceof Error ? error.message: "Failed to analyze image. Please try again ")
  }

}