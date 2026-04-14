"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function RewardModal({ data, onClose }: any) {
  // Đảm bảo AnimatePresence bọc bên ngoài điều kiện render
  return (
    <AnimatePresence>
      {data && ( // CHỈ render khi có data
        <motion.div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100]" // z-index cực cao
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.3, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.3 }}
            onClick={(e) => e.stopPropagation()} // Ngăn click vào modal bị đóng
            className="bg-white p-6 rounded-2xl text-center shadow-2xl w-[300px]"
          >
            <div className="text-xl font-bold mb-4">🎉 {data.reward}</div>
            <button
              className="px-4 py-2 bg-purple-600 text-white rounded-xl"
              onClick={onClose}
            >
              Nhận quà
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}