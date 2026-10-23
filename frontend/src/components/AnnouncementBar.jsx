import React from "react";
import { Sparkles, Truck } from "lucide-react";

const AnnouncementBar = () => {
  return (
    <div className="bg-zinc-900 text-zinc-300 py-2 px-4 text-xs tracking-wider uppercase font-medium border-b border-zinc-800 text-center flex items-center justify-center gap-3">
      <Sparkles className="w-3.5 h-3.5 text-zinc-400 hidden sm:inline" />
      <span>
        Festive Heritage Collection Live • Free Pan-India Delivery Above ₹999 • Code: <strong className="text-white underline tracking-widest">MAVTAR10</strong> for 10% OFF
      </span>
      <Truck className="w-3.5 h-3.5 text-zinc-400 hidden sm:inline" />
    </div>
  );
};

export default AnnouncementBar;
