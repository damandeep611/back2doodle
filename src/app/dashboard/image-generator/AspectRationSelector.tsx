"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Square, RectangleHorizontal, RectangleVertical } from "lucide-react";

interface AspectRatioOption {
  id: string;
  name: string;
  ratio: string;

  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const aspectRatios: AspectRatioOption[] = [
  {
    id: "square",
    name: "Square",
    ratio: "1:1",

    icon: Square,
  },
  {
    id: "landscape",
    name: "Landscape",
    ratio: "16:9",

    icon: RectangleHorizontal,
  },
  {
    id: "portrait",
    name: "Portrait",
    ratio: "9:16",

    icon: RectangleVertical,
  },
];

export default function AspectRatioSelector() {
  const [selectedRatio, setSelectedRatio] = useState<AspectRatioOption>(
    aspectRatios[0]
  );

  const handleSelect = (ratio: AspectRatioOption) => {
    setSelectedRatio(ratio);
  };

  return (
    <div className="w-full">
     

      {/* Ratio Options in Row */}
      <div className="grid grid-cols-3 gap-2">
        {aspectRatios.map((ratio, index) => {
          const isSelected = selectedRatio.id === ratio.id;
          return (
            <motion.button
              key={ratio.id}
              onClick={() => handleSelect(ratio)}
              className={`relative flex items-center gap-2 p-2 rounded-md border-1 transition-all duration-200 ${
                isSelected
                  ? "border-green-500 bg-green-500/10 shadow-lg shadow-green-500/20"
                  : "border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-750"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Selection Indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2  flex items-center justify-center shadow-lg"
                >
                  <div className="w-2 h-2 bg-white rounded-full" />
                </motion.div>
              )}

              {/* Icon */}
              <div
                className={`flex justify-center mb-2 ${
                  isSelected ? "text-green-400" : "text-gray-400"
                }`}
              >
                <ratio.icon size={24} />
              </div>

              {/* Content */}
              <div className="text-center">
                <div
                  className={`font-medium text-[10px] ${
                    isSelected ? "text-white" : "text-gray-200"
                  }`}
                >
                  {ratio.name}
                </div>
                <div
                  className={`text-[10px] font-mono mb-1 ${
                    isSelected ? "text-green-300" : "text-gray-400"
                  }`}
                >
                  {ratio.ratio}
                </div>
              </div>

              {/* Hover Effect */}
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-green-400/0 to-green-600/0 opacity-0"
                whileHover={{
                  opacity: isSelected ? 0 : 0.1,
                  background:
                    "linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(22, 163, 74, 0.1))",
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
