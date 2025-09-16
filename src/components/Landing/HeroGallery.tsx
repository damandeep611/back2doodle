"use client";
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
interface HeroGalleryTypes {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const HeroGalleryItems: HeroGalleryTypes[] = [
  {
    id: "1",
    title: "Abstract Data Display",
    description: "Generate Abstract cinematic shots",
    imageUrl:
      "https://image.lexica.art/full_jpg/c1847a6f-8da4-44ef-8d64-99f047b98ea3",
  },
  {
    id: "2",
    title: "Minimlistic Geometric Composition",
    description: "Generate Compositions",
    imageUrl:
      "https://image.lexica.art/full_jpg/b19dd898-985c-4597-b4ad-e336da2ff0eb",
  },
  {
    id: "3",
    title: "Abstract 3D Illustration",
    description: "Personalized Portraits and illustrations",
    imageUrl:
      "https://image.lexica.art/full_jpg/16308440-2028-4387-9d92-dbb20926ae97",
  },
];

// motion effects
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const iconVariants: Variants = {
  hover: {
    rotate: 45,
    scale: 1.1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};
export default function HeroGallery() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  return (
    <div className="md:px-8 p-2 ">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col md:flex-row gap-6"
      >
        {HeroGalleryItems.map((item) => (
          <motion.div
            key={item.id}
            variants={cardVariants}
            whileHover="hover"
            className="group cursor-pointer"
            onHoverStart={() => setHoveredCard(item.id)}
            onHoverEnd={() => setHoveredCard(null)}
            animate={{
              flex:
                hoveredCard === item.id
                  ? "1.3 1 0%"
                  : hoveredCard && hoveredCard !== item.id
                  ? "0.7 1 0% "
                  : "1 1 0%",
            }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div className="relative h-80 rounded-2xl overflow-hidden bg-gray-100 shadow-lg w-full">
              {/* bgimage */}
              <div className="absolute inset-0">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              {/* content overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="flex justify-end">
                  <motion.div
                    variants={iconVariants}
                    className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30"
                  >
                    <ArrowUpRight size={16} className="text-white" />
                  </motion.div>
                </div>
                {/* bottom content */}
                <div className="text-white">
                  <h3 className="text-xl font-semibold mb-1 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-white/30 text-sm font-medium">
                    {item.description}
                  </p>
                </div>
              </div>
              {/* hover overlay effect  */}
              <motion.div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" initial={{opacity: 0}} whileHover={{opacity: 1}}/>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
