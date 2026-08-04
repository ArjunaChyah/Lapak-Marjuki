'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatRupiahCompact, buildWhatsAppMessage, generateWhatsAppUrl } from '@/lib/formatters';
import { STORE_CONFIG } from '@/lib/config';
import { CheckCircle2, MessageCircle, Home, Utensils, PhoneCall } from 'lucide-react';

export default function OrderSuccessPage() {
  const [lastOrder, setLastOrder] = useState<any>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('last_order');
      if (saved) {
        setLastOrder(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleReopenWhatsApp = () => {
    if (!lastOrder) {
      window.open(`https://wa.me/${STORE_CONFIG.whatsappNumber}`, '_blank');
      return;
    }
    const message = buildWhatsAppMessage(lastOrder.cart, lastOrder.orderDetails);
    const waUrl = generateWhatsAppUrl(message);
    window.open(waUrl, '_blank');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-8">
      
      {/* Checkmark Icon */}
      <div className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-2xl animate-pulse-subtle border-4 border-emerald-200 dark:border-emerald-800">
        <CheckCircle2 className="w-14 h-14" />
      </div>

      <div className="space-y-3">
        <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-3.5 py-1 rounded-full">
          Pesanan Berhasil Dikirim
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white">
          Terima Kasih Atas Pesanan Anda!
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-sm max-w-md mx-auto">
          Pesanan Anda telah diteruskan ke WhatsApp Ibu Yulia ({STORE_CONFIG.name}). Kami akan segera mengonfirmasi dan menyiapkan makanan segar untuk Anda.
        </p>
      </div>

      {/* Order Summary Box */}
      {lastOrder && (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-orange-100 dark:border-zinc-800 shadow-lg text-left space-y-4 max-w-lg mx-auto">
          <h2 className="font-bold text-base text-stone-900 dark:text-white border-b border-orange-100 dark:border-zinc-800 pb-2">
            Rincian Pesanan
          </h2>

          <div className="space-y-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
            {lastOrder.cart.map((item: any) => (
              <div key={item.product.id} className="flex justify-between">
                <span>{item.quantity}x {item.product.name}</span>
                <span className="font-bold">{formatRupiahCompact(item.product.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-orange-100 dark:border-zinc-800 pt-3 flex justify-between font-black text-base text-orange-600 dark:text-orange-400">
            <span>Total Tagihan</span>
            <span>{formatRupiahCompact(lastOrder.subtotal)}</span>
          </div>

          <div className="text-xs text-stone-500 space-y-1 bg-orange-50 dark:bg-zinc-800/80 p-3 rounded-xl">
            <p><strong>Pemesan:</strong> {lastOrder.orderDetails.fullName} ({lastOrder.orderDetails.phoneNumber})</p>
            <p><strong>Metode:</strong> {lastOrder.orderDetails.deliveryMethod === 'ambil-sendiri' ? 'Ambil Sendiri' : 'Diantar'}</p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={handleReopenWhatsApp}
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xl shadow-emerald-600/30 flex items-center justify-center space-x-2 transition hover:scale-105"
        >
          <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
          <span>Buka Kembali WhatsApp</span>
        </button>

        <Link
          href="/menu"
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-lg flex items-center justify-center space-x-2 transition"
        >
          <Utensils className="w-4 h-4" />
          <span>Pesan Lagi</span>
        </Link>

        <Link
          href="/"
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-stone-100 dark:bg-zinc-800 text-stone-700 dark:text-stone-200 font-bold text-sm hover:bg-stone-200 dark:hover:bg-zinc-700 transition flex items-center justify-center space-x-2"
        >
          <Home className="w-4 h-4" />
          <span>Ke Beranda</span>
        </Link>
      </div>

    </div>
  );
}
