"use client"
import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import React from "react";

const keywords = [
  { text: "fetching data", x: 20, y: 15 },
  { text: "image analzing", x: 65, y: 12 },
  { text: "prompt integration", x: 85, y: 25 },
  { text: "extracting items", x: 15, y: 35 },
  { text: "building format", x: 70, y: 35 },
  { text: "formatting text", x: 25, y: 55 },
  { text: "preparing output", x: 75, y: 55 },
];
export default function LoadingState() {
  return (
    <div className="relative w-full h-96   rounded-lg border border-zinc-100 ">
      {/* upper section with animated keywords */}
      <div className="relative p-12 pb-6">
        <div className="absolute inset-0 pointer-events-none">
          {keywords.map((keyword, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0, 0.6, 0.6, 0],
                scale: [0.8, 1, 1, 0.8],
                y: [0, -10, -10, 0],
              }}
              transition={{
                duration: 4,
                delay: index * 0.3,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 2,
              }}
              style={{
                left: `${keyword.x}%`,
                top: `${keyword.y}%`,
                transform: "translate(-50%, -50%",
              }}
              className="absolute text-gray-400 text-sm font-medium whitespace-nowrap z-0"
            >
              {keyword.text}
            </motion.div>
          ))}
        </div>
        {/* cental icon */}
        <div className="flex flex-col items-center justify-center relative z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="relative mb-8"
          >
            {/* Outer Ring */}
            <motion.div
              className="w-20 h-20 rounded-full border-4 border-gray-200"
              animate={{
                borderColor: ["#e5e7eb", "#8b5cf6", "#e5e7eb"],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            {/* Inner Icon */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
            </motion.div>
          </motion.div>

          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="bg-gray-100 uppercase text-gray-600 px-6 py-2 rounded-full text-sm font-medium"
          >
            Analyzing reference image
          </motion.div>
        </div>
        {/* Subtle Background Animation - only in upper section */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-blue-50/30 rounded-t-3xl"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>
      <div className="px-12 pb-12 pt-6 bg-white relative z-10">
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="text-xl font-bold text-gray-900 mb-4 text-center"
        >
          Fetching output
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="text-gray-500 text-center text-sm leading-relaxed max-w-md mx-auto"
        >
          We&apos;re now running jobs in the background based on your brief.
          You&apos;ll start seeing output show up shortly — no action needed.
        </motion.p>
      </div>
    </div>
  );
}
