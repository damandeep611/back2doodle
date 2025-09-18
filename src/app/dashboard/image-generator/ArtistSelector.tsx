"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, User, Camera } from 'lucide-react';

interface ArtistOption {
  id: string;
  name: string;
  style: string;
  specialty: string;
  period?: string;
}

const photographerStyles: ArtistOption[] = [
  {
    id: 'adams',
    name: 'Ansel Adams',
    style: 'Black & White Landscape',
    specialty: 'Nature photography with dramatic contrast',
    
  },
  {
    id: 'leibovitz',
    name: 'Annie Leibovitz',
    style: 'Portrait Photography',
    specialty: 'Celebrity and fashion portraits',
   
  },
  {
    id: 'cartier',
    name: 'Henri Cartier-Bresson',
    style: 'Street Photography',
    specialty: 'Decisive moment candid shots',
   
  },
  {
    id: 'newton',
    name: 'Helmut Newton',
    style: 'Fashion Photography',
    specialty: 'High contrast glamour shots',
   
  },
  {
    id: 'avedon',
    name: 'Richard Avedon',
    style: 'Portrait & Fashion',
    specialty: 'Minimalist white background portraits',
   
  },
  {
    id: 'salgado',
    name: 'Sebastião Salgado',
    style: 'Documentary',
    specialty: 'Social documentary in black & white',
   
  }
];

const artisticStyles: ArtistOption[] = [
  {
    id: 'none',
    name: 'No Artist Style',
    style: 'Original',
    specialty: 'Pure AI generation without artistic influence'
  },
  {
    id: 'picasso',
    name: 'Pablo Picasso',
    style: 'Cubism',
    specialty: 'Geometric abstraction and fragmentation'
  },
  {
    id: 'vangogh',
    name: 'Vincent van Gogh',
    style: 'Post-Impressionism',
    specialty: 'Bold colors and emotional brushwork'
  },
  {
    id: 'monet',
    name: 'Claude Monet',
    style: 'Impressionism',
    specialty: 'Light and atmospheric effects'
  }
];

export default function ArtistStyleSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<ArtistOption>(photographerStyles[0]);
  const [currentOptions, setCurrentOptions] = useState<ArtistOption[]>(photographerStyles);

  const handleSelect = (artist: ArtistOption) => {
    setSelectedArtist(artist);
    setIsOpen(false);
  };

  const switchToPhotographers = () => {
    setCurrentOptions(photographerStyles);
    if (!photographerStyles.find(a => a.id === selectedArtist.id)) {
      setSelectedArtist(photographerStyles[0]);
    }
  };

  const switchToArtistic = () => {
    setCurrentOptions(artisticStyles);
    if (!artisticStyles.find(a => a.id === selectedArtist.id)) {
      setSelectedArtist(artisticStyles[0]);
    }
  };

  return (
    <div className="w-full">
    

      <div className="relative">
        {/* Category Toggle */}
        <div className="flex mb-2 bg-gray-900 rounded-lg p-1 border border-gray-700">
          <motion.button
            onClick={switchToPhotographers}
            className={`flex-1 px-3 py-1 rounded-md text-xs font-medium transition-all ${
              currentOptions === photographerStyles
                ? 'bg-gray-600 text-white shadow-md'
                : 'text-gray-400 hover:text-gray-300'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            <Camera size={12} className="inline mr-1" />
            Photographers
          </motion.button>
          <motion.button
            onClick={switchToArtistic}
            className={`flex-1 px-3 py-1 rounded-md text-xs font-medium transition-all ${
              currentOptions === artisticStyles
                ? 'bg-gray-600 text-white shadow-md'
                : 'text-gray-400 hover:text-gray-300'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            <User size={12} className="inline mr-1" />
            Artists
          </motion.button>
        </div>

        {/* Selected Option Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-xl px-4 py-2 flex items-center justify-between text-left transition-all duration-200"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 text-blue-600 bg-gray-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className=" font-bold text-sm">
                {selectedArtist.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <div className="text-white font-medium text-sm">{selectedArtist.name}</div>
              <div className="text-gray-400 text-xs">{selectedArtist.style}</div>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={16} className="text-gray-400" />
          </motion.div>
        </motion.button>

        {/* Dropdown Options */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-600 rounded-xl shadow-2xl z-50 overflow-hidden backdrop-blur-sm max-h-64 overflow-y-auto"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#4B5563 transparent' }}
            >
              {currentOptions.map((artist, index) => {
                const isSelected = selectedArtist.id === artist.id;
                return (
                  <motion.button
                    key={artist.id}
                    onClick={() => handleSelect(artist)}
                    className={`w-full px-4 py-2 flex items-center space-x-3 text-left transition-all duration-150 ${
                      isSelected 
                        ? 'bg-gray-700 text-white' 
                        : 'hover:bg-gray-750 text-gray-100'
                    } ${index !== currentOptions.length - 1 ? 'border-b border-gray-700' : ''}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    whileHover={{ x: 4 }}
                  >
                    <div className="w-10 h-10 bg-gradient-to-r text-blue-500 bg-gray-600 rounded-lg flex items-center justify-center shadow-lg">
                      <span className=" font-bold text-sm">
                        {artist.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{artist.name}</div>
                      <div className={`text-xs truncate ${isSelected ? 'text-gray-300' : 'text-gray-400'}`}>
                        {artist.style}
                      </div>
                     
                    </div>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        
                      >
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}