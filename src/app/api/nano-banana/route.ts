import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { prompt, ImageData, mimeType } = await request.json()
    //log this if data parsing related error occurs during dev
    const geminiApiKey = process.env.GEMINI_API_KEY
    if (!geminiApiKey) {
      return NextResponse.json(
        {
          error: "GEMINI_API_KEY environment variable is not set. Please add your Google AI Studio API key.",
          setup: "Get your free API key from https://aistudio.google.com/app/apikey",
        },
        { status: 500 },
      )
    }
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `I want to edit this image with the following instruction: "${prompt}". 
                  
                  Since I cannot directly edit images, please provide me with:
                  1. A detailed description of what you see in the current image
                  2. Specific step-by-step instructions on how to achieve the requested edit using image editing software
                  3. Technical details like color codes, positioning, and effects needed
                  
                  Be very specific and detailed in your response.`,
                },
                {
                  inlineData: {
                    mimeType: mimeType || "image/jpeg",
                    data: ImageData,
                  },
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          },
        }),
      },
    )

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text()
      console.error("Gemini API error:", errorText)

      if (geminiResponse.status === 401) {
        return NextResponse.json(
          { error: "Invalid API key. Please check your GEMINI_API_KEY environment variable." },
          { status: 401 },
        )
      }

      if (geminiResponse.status === 429) {
        return NextResponse.json(
          { error: "API quota exceeded. Please check your Google AI Studio quota limits." },
          { status: 429 },
        )
      }

      throw new Error(`Gemini API error: ${geminiResponse.status}`)
    }

    const result = await geminiResponse.json()

    const candidate = result.candidates?.[0]
    const textResponse = candidate?.content?.parts?.[0]?.text

    if (!textResponse) {
      return NextResponse.json({ error: "No response received from Gemini API." }, { status: 500 })
    }

    return NextResponse.json({
      analysis: textResponse,
      note: "Gemini API can analyze images but cannot directly edit them. The response above provides detailed instructions for achieving your desired edit.",
    })
  } catch (error) {
    console.error("Gemini API error:", error)

    return NextResponse.json({ error: "Failed to process image. Please try again later." }, { status: 500 })
  }
}
