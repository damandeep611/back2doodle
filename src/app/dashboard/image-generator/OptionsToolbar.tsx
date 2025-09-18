import {
  ImageIcon,
  
} from "lucide-react";
import React from "react";
import SubmitSection from "./SubmitSection";
import ModelSelector from "./ModelSelector";
import PromptInputArea from "./PromptInputArea";
import StyleSelector from "./StyleSelector";
import ArtistStyleSelector from "./ArtistSelector";
import AspectRatioSelector from "./AspectRationSelector";
import GenerationMode from "./GenerationMode";

export default function OptionsToolbar() {
  return (
    <div className=" bg-zinc-900   my-2   text-white rounded-2xl p-2 ">
      <div className="flex flex-col space-y-3">
        {/* toolbar header */}
        <div className="flex items-center justify-center text-blue-500 gap-4 py-2 bg-black   ">
          <ImageIcon size={16} />
          <h2 className="font-medium text-sm ">Text-to-Image</h2>
        </div>
        {/* model selector options */}
        <ModelSelector />
        {/* prompt input */}
        <PromptInputArea />
        {/* choose a style */}
        <StyleSelector />
        {/* choose artist style */}
        <ArtistStyleSelector />
        <AspectRatioSelector />
        <GenerationMode />
        {/* submit options */}
        <SubmitSection />
      </div>
    </div>
  );
}
