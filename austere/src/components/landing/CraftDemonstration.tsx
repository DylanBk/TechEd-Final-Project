'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const fabrics = [
  { name: 'Vitale Barberis Canonico Wool', color: '#001f3f' },
  { name: 'Solbiati Linen', color: '#5F5F5F' },
  { name: 'Piacenza Cashmere', color: '#EAE0D5' },
  { name: 'Dormeuil Velvet', color: '#0C0C0C' },
  { name: 'Holland & Sherry Herringbone', color: '#A9A9A9' },
];

const hotspots = [
  { id: 1, x: '55%', y: '30%', label: 'Lapel Width' },
  { id: 2, x: '52%', y: '55%', label: 'Button Selection' },
  { id: 3, x: '35%', y: '45%', label: 'Fabric Weight' },
];

const CraftDemonstration = () => {
  const [activeFabric, setActiveFabric] = useState(fabrics[0]);
  const [hoveredHotspot, setHoveredHotspot] = useState<number | null>(null);

  return (
    <section 
      className="relative min-h-[140vh] bg-warm-limestone py-24 px-6 md:px-12"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        <div className="lg:col-span-2 relative w-full aspect-[4/3]">
          <Image src="/craft-blueprint.png" alt="Architectural blueprint of a tailored blazer" layout="fill" objectFit="contain" />
          {hotspots.map(spot => (
            <div key={spot.id} className="absolute" style={{ left: spot.x, top: spot.y }} onMouseEnter={() => setHoveredHotspot(spot.id)} onMouseLeave={() => setHoveredHotspot(null)}>
              <motion.div 
                className="w-4 h-4 rounded-full bg-warm-copper/70 border-2 border-white cursor-pointer"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <AnimatePresence>
                {hoveredHotspot === spot.id && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: -20 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-charcoal text-white text-sm rounded-md whitespace-nowrap"
                  >
                    {spot.label}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white/50 p-6 rounded-sm shadow-lg backdrop-blur-md">
            <h3 className="font-serif text-2xl text-charcoal mb-4">Technical Specifications</h3>
            <div className="space-y-2 text-charcoal/80 font-sans">
              <p><strong>Price:</strong> $1,250</p>
              <p><strong>Est. Completion:</strong> 14 Days</p>
              <p><strong>Fabric:</strong> {activeFabric.name}</p>
              <p><strong>Origin:</strong> Italy</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h4 className="font-serif text-xl text-center text-charcoal mb-6">Select Your Fabric</h4>
        <div className="flex items-center justify-center space-x-4 overflow-x-auto pb-4">
          {fabrics.map((fabric) => (
            <motion.button
              key={fabric.name}
              onClick={() => setActiveFabric(fabric)}
              className={`w-24 h-16 flex-shrink-0 rounded-md border-4 shadow-md transition-all`}
              style={{ backgroundColor: fabric.color, borderColor: activeFabric.name === fabric.name ? '#B87333' : 'transparent' }}
              whileHover={{ y: -5 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CraftDemonstration;
