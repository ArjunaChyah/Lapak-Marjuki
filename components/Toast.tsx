'use client';

import React, { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { CheckCircle2, X } from 'lucide-react';

export function Toast() {
  const { toastMessage, hideToast } = useCart();

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, hideToast]);

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in max-w-sm w-full">
      <div className="bg-orange-600 dark:bg-orange-700 text-white p-4 rounded-xl shadow-2xl flex items-center justify-between border border-orange-400">
        <div className="flex items-center space-x-3">
          <CheckCircle2 className="w-6 h-6 flex-shrink-0 text-amber-200" />
          <p className="text-sm font-medium">{toastMessage}</p>
        </div>
        <button
          onClick={hideToast}
          className="text-white/80 hover:text-white p-1 rounded-lg transition"
          aria-label="Tutup Notifikasi"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
