'use client';

import React from 'react';
import { STORE_CONFIG } from '@/lib/config';
import { MessageCircle } from 'lucide-react';

export function WhatsAppFloatingBtn() {
  const waUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent("Halo Warung Marjuki'S Ibu Yulia, saya ingin bertanya / memesan makanan.")}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 p-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center space-x-2 group border-2 border-white dark:border-zinc-900"
      aria-label="Pesan via WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap text-xs font-bold pl-0 group-hover:pl-1">
        Pesan via WA
      </span>
    </a>
  );
}
