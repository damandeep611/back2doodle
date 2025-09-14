import { NextResponse } from "next/server"

export async function GET() {
  try {
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

    try {
      const testResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${geminiApiKey}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!testResponse.ok) {
        if (testResponse.status === 401) {
          return NextResponse.json({ error: "Invalid GEMINI_API_KEY. Please check your API key." }, { status: 500 })
        }
        throw new Error(`Gemini API test failed: ${testResponse.status}`)
      }
    } catch (apiError) {
      return NextResponse.json(
        { error: "Failed to connect to Gemini API. Please check your API key and internet connection." },
        { status: 500 },
      )
    }

    return NextResponse.json({
      status: "ready",
      message: "Gemini API is ready to process images",
      service: "Google Gemini 2.5 Flash",
    })
  } catch (error) {
    console.error("Health check error:", error)
    return NextResponse.json({ error: "API health check failed" }, { status: 500 })
  }
}
