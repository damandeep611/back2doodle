"use client";
import { AnimatePresence } from "framer-motion";
import {
  ArrowUp,
  CarFront,
  Globe,
  Landmark,
  Mountain,
  RotateCcw,
  User,
  Zap,
} from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";

interface SelectSceneTypes {
  id: string;
  icon: React.ReactNode;
  title: string;
}

const SelectScene: SelectSceneTypes[] = [
  { id: "gen", icon: <Globe size={16} />, title: "General" },
  { id: "charcter", icon: <User size={16} />, title: "Character" },
  { id: "architecture", icon: <Landmark size={16} />, title: "Architecture" },
  { id: "nature", icon: <Mountain size={16} />, title: "Nature/Landscape" },
  { id: "vehicle", icon: <CarFront size={16} />, title: "Vehicle" },
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
    setIsDropdownOpen(false);
  };

  //toggle category button
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // image inpput
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
      {/* selected categories with dropdown  */}
      <div className="relative">
        {selectedCategories.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {selectedCategories.map((categoryId) => {
              const category = SelectScene.find((c) => c.id === categoryId);
              return category ? (
                <span
                  key={categoryId}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {category.icon}
                  {category.title}
                </span>
              ) : null;
            })}
          </div>
        )}

        {/* showing category dropdown when category button is clicked */}
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute bg-white -bottom-24 left-0 w-[300px] rounded-2xl shadow-lg border border-zinc-200 overflow-hidden z-10"
            >
              <div className="p-4">
                <h3 className="text-xs font-semibold text-zinc-700 mb-2">
                  Scene / Style Categories
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {SelectScene.map((category, index) => (
                    <motion.button
                      key={category.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleCategorySelect(category.id)}
                      className={`flex items-center gap-2 p-2 text-left rounded-lg transition-colors ${
                        selectedCategories.includes(category.id)
                          ? "bg-blue-100 border-2 border-blue-300 text-blue-900"
                          : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                      }`}
                    >
                      <div
                        className={
                          selectedCategories.includes(category.id)
                            ? "text-blue-600"
                            : "text-gray-600"
                        }
                      >
                        {category.icon}
                      </div>
                      <span className="font-medium text-xs">
                        {category.title}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="relative shadow-lg rounded-xl">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          maxLength={500}
          placeholder="Describe how you want to modify your image... (e.g., 'Add a sunset in the background' or 'Make it look like a painting')"
          className=" text-sm w-full rounded-xl h-24 px-4 py-3 border border-zinc-300 resize-none focus:outline-emerald-200 text-zinc-800 placeholder-gray-500  border-none outline-none min-h-[60px] max-h-32 overflow-y-auto "
        />
        {/* Bottom Control Section */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200">
          <button
            onClick={toggleDropdown}
            className=" text-sm cursor-pointer border border-dashed py-2 px-4 rounded-lg flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <Zap className="w-4 h-4" />
            <span className="font-medium">Categories</span>
          </button>

          <div className="flex items-center gap-3 text-sm">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>

            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              <ArrowUp className="w-4 h-4" />
              Analyze Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
