"use client"
import { Wand2, Search, Palette, ImageIcon, BookOpen, Lightbulb, ExternalLink } from 'lucide-react'
import React from 'react'


interface PromptLibrary {
  id: string
  name: string
  icon: React.ReactNode
  url: string
  description: string
}

const promptLibraries: PromptLibrary[] = [
  {
    id: "prompthero",
    name: "PromptHero",
    icon: <Wand2 className="w-4 h-4" />,
    url: "https://prompthero.com",
    description: "AI prompts",
  },
  {
    id: "lexica",
    name: "Lexica",
    icon: <Search className="w-4 h-4" />,
    url: "https://lexica.art",
    description: "Stable Diffusion",
  },
  {
    id: "openart",
    name: "OpenArt",
    icon: <Palette className="w-4 h-4" />,
    url: "https://openart.ai",
    description: "AI art prompts",
  },
  {
    id: "civitai",
    name: "Civitai",
    icon: <ImageIcon className="w-4 h-4" />,
    url: "https://civitai.com",
    description: "AI models",
  },
  {
    id: "promptbase",
    name: "PromptBase",
    icon: <BookOpen className="w-4 h-4" />,
    url: "https://promptbase.com",
    description: "Prompt marketplace",
  },
  {
    id: "arthub",
    name: "ArtHub",
    icon: <Lightbulb className="w-4 h-4" />,
    url: "https://arthub.ai",
    description: "Creative prompts",
  },
]


export default function PromptIdeas() {
  
  const handleLibraryClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-4 h-4 text-gray-600" />
          <h3 className="text-sm font-medium text-gray-700">Get Inspiration</h3>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {promptLibraries.map((library) => (
            <button
              key={library.id}
              onClick={() => handleLibraryClick(library.url)}
              className="flex items-center gap-2 p-2 text-left rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group"
            >
              <div className="text-gray-500 group-hover:text-gray-700">{library.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-gray-700 group-hover:text-gray-900 truncate">
                  {library.name}
                </div>
                <div className="text-xs text-gray-500 truncate">{library.description}</div>
              </div>
              <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-gray-600" />
            </button>
          ))}
        </div>
      </div>
  )
}
