"use client";
import {
  CarFront,
  Globe,
  Landmark,
  LucideIcon,
  Mountain,
  User,
  Wand2,
} from "lucide-react";
import React from "react";

interface SelectSceneTypes {
  icon: LucideIcon;
  title: string;
}

const SelectScene: SelectSceneTypes[] = [
  { icon: Globe, title: "General" },
  { icon: User, title: "Character" },
  { icon: Landmark, title: "Architecture" },
  { icon: Mountain, title: "Nature/Landscape" },
  { icon: CarFront, title: "Vehicle" },
];

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
      <div className="flex items-center justify-between py-2 text-sm text-zinc-500">
        <p>What do you want from this image ? </p>
        <span>{value.length}/500</span>
      </div>
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Describe how you want to modify your image... (e.g., 'Add a sunset in the background' or 'Make it look like a painting')"
          className=" text-sm w-full rounded-xl h-24 px-4 py-3 border border-zinc-300 resize-none focus:outline-emerald-200 text-zinc-800 "
        />
        <div className="absolute bottom-3 right-3">
          <Wand2 size={14} />
        </div>
      </div>
      {/* choosing image style  */}
      <div>
        <span className="text-sm">Scene / Style</span>
        <div className="flex flex-wrap gap-1">
          {SelectScene.map((scene) => (
            <button
              key={scene.title}
              className="flex items-center justify-between gap-2 bg-zinc-200 hover:bg-zinc-300 text-sm p-1 px-2 rounded-md "
            >
              <scene.icon size={16} className="text-blue-500" />
              <span className="text-zinc-700">{scene.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
