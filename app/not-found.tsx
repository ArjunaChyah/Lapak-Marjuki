import React from 'react';
import Link from 'next/link';
import { UtensilsCrossed, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6">
      
      <div className="w-24 h-24 rounded-3xl bg-orange-100 dark:bg-zinc-800 text-orange-600 dark:text-orange-400 flex items-center justify-center mx-auto shadow-xl border-2 border-orange-200 dark:border-zinc-700">
        <UtensilsCrossed className="w-12 h-12" />
      </div>

      <div className="space-y-2">
        <span className="text-6xl font-black text-orange-600 dark:text-orange-400">404</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-sm max-w-md mx-auto">
          Maaf, halaman atau piring masakan yang Anda cari sepertinya sudah tidak tersedia di Warung Marjuki'S.
        </p>
      </div>

      <div className="pt-4 flex items-center justify-center space-x-4">
        <Link
          href="/menu"
          className="px-6 py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-lg flex items-center space-x-2 transition"
        >
          <UtensilsCrossed className="w-4 h-4" />
          <span>Lihat Menu Makanan</span>
        </Link>
        <Link
          href="/"
          className="px-6 py-3.5 rounded-2xl bg-stone-100 dark:bg-zinc-800 text-stone-700 dark:text-stone-200 font-bold text-sm hover:bg-stone-200 dark:hover:bg-zinc-700 transition flex items-center space-x-2"
        >
          <Home className="w-4 h-4" />
          <span>Ke Beranda</span>
        </Link>
      </div>

    </div>
  );
}
