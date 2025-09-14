"use client";
import { Lightbulb, Wand2 } from "lucide-react";
import React from "react";

interface InputPromptProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export default function InputPrompt({
  value,
  onChange,
  onSubmit,
  disabled = false,
}: InputPromptProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onSubmit();
    }
  };
  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-2">
        <p className="text-sm">Edit Prompt</p>
        <div className="flex items-center justify-between gap-2">
          <Lightbulb size={14} />
          <p className="text-sm">Examples</p>
        </div>
      </div>
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Describe how you want to modify your image... (e.g., 'Add a sunset in the background' or 'Make it look like a painting')"
          className=" text-sm w-full rounded-xl h-24 px-4 py-3 border border-gray-600 resize-none "
        />
        <div className="absolute bottom-3 right-3">
          <Wand2 size={14} />
        </div>
      </div>
      {/* text limit shown  */}
      <div className="flex items-center justify-between text-xs">
        <span>Press Cmd/Ctrl + Enter to edit</span>
        <span>/500</span>
      </div>
    </div>
  );
}
