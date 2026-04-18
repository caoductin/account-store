"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

interface BagCardProps {
    bag: any;
    onRequireLogin: () => void;
}

export default function BagCard({ bag, onRequireLogin }: BagCardProps) {
    const router = useRouter();
    const {user, loading} = useAuth();

    const handleClick = () => {
        if (loading)  return ;
        if(!user) {
            onRequireLogin()
            return;
        }
        router.push(`/xe-tui-mu/${bag.id}`);
    };

    return (
        <div className="group bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden border border-slate-100">

            <div className="relative h-40 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <span className="text-4xl">🎁</span>

                <div className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-lg">
                    HOT
                </div>
            </div>

            <div className="p-4 flex flex-col gap-3">
                <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition">
                    {bag.name}
                </h3>

                <p className="text-sm text-slate-500">
                    Có cơ hội nhận skin hiếm
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="text-blue-600 font-black">
                        {bag.price.toLocaleString("vi-VN")}đ
                    </span>

                    <button
                        onClick={handleClick}
                        className="w-full sm:w-auto px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                    >
                        Xé ngay
                    </button>
                </div>
            </div>
        </div>
    );
}