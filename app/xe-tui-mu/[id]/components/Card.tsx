"use client";

import { motion } from "framer-motion";

export default function Card({ value, onClick, loading }: any) {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className="aspect-square relative cursor-pointer perspective-1000"
    >
      <motion.div
        animate={{ rotateY: value ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        className="w-full h-full relative transform-style-3d pointer-events-none"
      >
        {/* FRONT */}
        <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl z-10">
           <span className="text-3xl">🎁</span>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 rotate-y-180 backface-hidden bg-white rounded-2xl flex items-center justify-center shadow-xl p-2 border-2 border-purple-500">
          <span className="text-center font-bold text-gray-800 text-sm">
            {value}
          </span>
        </div>
      </motion.div>
      
      {/* Lớp phủ hứng click nằm trên cùng */}
      <div 
        className="absolute inset-0 z-50" 
        onClick={(e) => {
          console.log("Đã click trúng lớp phủ!");
          onClick();
        }}
      /> 
    </motion.div>
  );
}