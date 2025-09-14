"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, AlertCircle, Loader2 } from "lucide-react"

interface ApiStatusProps {
  onStatusChange?: (isReady: boolean) => void
}

export function ApiStatus({ onStatusChange }: ApiStatusProps) {
  const [status, setStatus] = useState<"checking" | "ready" | "error" | "missing-key">("checking")
  const [errorMessage, setErrorMessage] = useState<string>("")

  useEffect(() => {
    checkApiStatus()
  }, [])

  const checkApiStatus = async () => {
    try {
      const response = await fetch("/api/health", {
        method: "GET",
      })

      if (response.ok) {
        setStatus("ready")
        onStatusChange?.(true)
      } else {
        const errorData = await response.json()
        if (response.status === 500 && errorData.error?.includes("GEMINI_API_KEY")) {
          setStatus("missing-key")
          setErrorMessage("GEMINI_API_KEY environment variable is not set")
        } else {
          setStatus("error")
          setErrorMessage(errorData.error || "API is not available")
        }
        onStatusChange?.(false)
      }
    } catch (error) {
      setStatus("error")
      setErrorMessage("Failed to connect to API")
      onStatusChange?.(false)
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case "checking":
        return <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
      case "ready":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "missing-key":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case "error":
        return <XCircle className="w-4 h-4 text-destructive" />
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "checking":
        return "Checking API status..."
      case "ready":
        return "API Ready"
      case "missing-key":
        return "API Key Required"
      case "error":
        return "API Error"
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "checking":
        return "text-muted-foreground"
      case "ready":
        return "text-green-600"
      case "missing-key":
        return "text-yellow-600"
      case "error":
        return "text-destructive"
    }
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      {getStatusIcon()}
      <span className={getStatusColor()}>{getStatusText()}</span>
      {(status === "error" || status === "missing-key") && (
        <button onClick={checkApiStatus} className="text-xs text-muted-foreground hover:text-foreground underline">
          Retry
        </button>
      )}
      {status === "missing-key" && (
        <div className="ml-2 text-xs text-muted-foreground">
          Get your free API key from{" "}
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Google AI Studio
          </a>
        </div>
      )}
    </div>
  )
}
