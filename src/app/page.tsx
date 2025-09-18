"use client"
import React from "react";
import { motion } from "framer-motion";
import HeroGallery from "@/components/Landing/HeroGallery";
import { ArrowUpRight } from "lucide-react";
import Navigation from "@/components/Landing/Navigation";

import {
  Wand2,
  Shirt,
  ImageIcon,
  Palette,
  Video,
  Music,
  Sparkles,
} from "lucide-react";

interface HeroChip {
  id: string;
  title: string;
  icon: React.ReactNode;
}

const heroChips: HeroChip[] = [
  {
    id: "magic-edit",
    title: "Magic Edit",
    icon: <Wand2 className="w-4 h-4" />,
  },
  {
    id: "virtual-try-on",
    title: "Virtual Try On",
    icon: <Shirt className="w-4 h-4" />,
  },
  {
    id: "text-to-image",
    title: "Text to Image",
    icon: <ImageIcon className="w-4 h-4" />,
  },
  {
    id: "ai-art-generator",
    title: "AI Art Generator",
    icon: <Palette className="w-4 h-4" />,
  },
  {
    id: "video-generation",
    title: "Video Generation",
    icon: <Video className="w-4 h-4" />,
  },
  {
    id: "sports ",
    title: "Sport events",
    icon: <Music className="w-4 h-4" />,
  },
  {
    id: "style-transfer",
    title: "Style Transfer",
    icon: <Sparkles className="w-4 h-4" />,
  },
];

const leftChips = heroChips.slice(0, 5);
const rightChips = heroChips.slice(5, 7);

export default function Home() {
  return (
    <div className="px-4 md:px-12 mb-16 ">
      <Navigation />
      {/* hero section  */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 pt-8 md:pt-20 p-2 md:p-8 ">
        <h2 className=" text-4xl md:text-7xl font-medium">
          From Thoughts <br className="hidden md:block" /> to Stunning Visuals
        </h2>
        <div className=" space-y-4 px-0 md:px-16">
          <p className="text-zinc-700 text-sm md:text-base">
            Craft high quality images from nothing but words. Our AI transforms
            your ideas into breathtaking visuals - Whether for Art, Design ,
            Storytelling or Pure Inspirations.
          </p>
          <div className="flex items-center justify-start gap-4 ">
            <button className="flex items-center justify-between gap-2 bg-zinc-950 text-white py-2 md:py-3 px-6 md:px-8 rounded-full text-sm md:text-base font-medium">
              Try for Free <ArrowUpRight size={16} />
            </button>
            <button className="flex items-center justify-between gap-2 border border-zinc-400 py-2 md:py-3 px-6 md:px-8 rounded-full text-sm md:text-base font-medium">
              Demo <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
      {/* chip tags on hero */}
      <div className=" p-8 hidden md:flex gap-4 items-center justify-between">
        <div className=" space-x-4 flex">
          {leftChips.map((chip, index) => (
            <span
              key={index}
              className=" flex items-center justify-between gap-2 px-2 md:px-4 py-1 md:py-2 text-xs md:text-base rounded-full border border-zinc-400 hover:bg-zinc-950 text-zinc-600 hover:text-white"
            >
              {chip.icon}
              <span className="text-xs whitespace-nowrap">{chip.title}</span>
            </span>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-full h-[1px] bg-zinc-500  mx-4"
        />
        <div className=" space-x-4 flex">
          {rightChips.map((chip, index) => (
            <span
              key={index}
              className=" flex items-center justify-between gap-2 px-2 md:px-4 py-1 md:py-2 text-xs md:text-base rounded-full border border-zinc-400 hover:bg-zinc-950 text-zinc-600 hover:text-white"
            >
              {chip.icon}
              <span className="text-xs whitespace-nowrap">{chip.title}</span>
            </span>
          ))}
        </div>
      </div>

      {/* image gallery */}
      <HeroGallery />
    </div>
  );
}
