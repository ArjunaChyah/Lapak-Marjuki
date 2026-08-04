'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatRupiahCompact } from '@/lib/formatters';
import { Plus, Minus, Trash2, ArrowRight, ShoppingBag, UtensilsCrossed, ShieldAlert } from 'lucide-react';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, subtotal, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-orange-100 dark:bg-zinc-800 flex items-center justify-center mx-auto text-orange-600 dark:text-orange-400 border-2 border-orange-200 dark:border-zinc-700">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-extrabold text-stone-900 dark:text-white">
          Keranjang Belanja Masih Kosong
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-sm max-w-md mx-auto">
          Yuk tambah menu soto ayam, nasi rames, es teh manis, atau mendoan hangat buatan Ibu Yulia!
        </p>
        <div className="pt-2">
          <Link
            href="/menu"
            className="inline-flex items-center space-x-2 px-8 py-4 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-xl shadow-orange-600/30 transition hover:scale-105"
          >
            <UtensilsCrossed className="w-5 h-5" />
            <span>Lihat Menu & Pesan</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-orange-100 dark:border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-stone-900 dark:text-white">
            Keranjang Belanja
          </h1>
          <p className="text-stone-600 dark:text-stone-400 text-sm mt-1">
            {totalItems} item makanan & minuman siap dipesan.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="flex items-center space-x-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-3.5 py-2 rounded-xl border border-rose-200 dark:border-rose-900 transition"
        >
          <Trash2 className="w-4 h-4" />
          <span>Kosongkan Keranjang</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Item List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => {
            const itemTotal = item.product.price * item.quantity;
            return (
              <div
                key={item.product.id}
                className="bg-white dark:bg-zinc-900 rounded-2xl p-4 sm:p-5 border border-orange-100 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition hover:shadow-md"
              >
                {/* Product Info */}
                <div className="flex items-center space-x-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-stone-100 dark:bg-zinc-800 flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase text-orange-600 dark:text-orange-400">
                      {item.product.category}
                    </span>
                    <h3 className="font-bold text-stone-900 dark:text-white text-base">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      @ {formatRupiahCompact(item.product.price)}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls & Subtotal */}
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-orange-100 dark:border-zinc-800">
                  
                  <div className="flex items-center bg-orange-50 dark:bg-zinc-800 rounded-xl p-1 border border-orange-200 dark:border-zinc-700">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-white dark:bg-zinc-700 flex items-center justify-center text-stone-700 dark:text-stone-200 hover:bg-orange-100 dark:hover:bg-zinc-600 transition"
                      aria-label="Kurangi Jumlah"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-extrabold text-stone-800 dark:text-stone-100">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-white dark:bg-zinc-700 flex items-center justify-center text-stone-700 dark:text-stone-200 hover:bg-orange-100 dark:hover:bg-zinc-600 transition"
                      aria-label="Tambah Jumlah"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-stone-500 dark:text-stone-400 block">Subtotal</span>
                    <span className="text-base font-extrabold text-orange-600 dark:text-orange-400">
                      {formatRupiahCompact(itemTotal)}
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-stone-400 hover:text-rose-600 p-1.5 rounded-lg transition"
                    aria-label="Hapus Item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Summary Box */}
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-orange-100 dark:border-zinc-800 shadow-lg space-y-6 sticky top-28">
            <h2 className="text-xl font-extrabold text-stone-900 dark:text-white border-b border-orange-100 dark:border-zinc-800 pb-3">
              Ringkasan Pesanan
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between text-stone-600 dark:text-stone-400">
                <span>Total Item ({totalItems})</span>
                <span className="font-semibold">{formatRupiahCompact(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-stone-600 dark:text-stone-400">
                <span>Ongkos Kirim</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">Dihitung saat checkout</span>
              </div>
              <div className="pt-3 border-t border-orange-100 dark:border-zinc-800 flex items-baseline justify-between text-stone-900 dark:text-white">
                <span className="text-base font-extrabold">Total Tagihan</span>
                <span className="text-2xl font-black text-orange-600 dark:text-orange-400">
                  {formatRupiahCompact(subtotal)}
                </span>
              </div>
            </div>

            <div className="bg-orange-50 dark:bg-zinc-800/80 p-3.5 rounded-2xl border border-orange-200 dark:border-zinc-700 flex items-start space-x-3 text-xs text-stone-600 dark:text-stone-300">
              <ShieldAlert className="w-4 h-4 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
              <span>Pesanan disiapkan segar hangat oleh Ibu Yulia begitu dikonfirmasi via WhatsApp.</span>
            </div>

            <Link
              href="/checkout"
              className="w-full py-4 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-base shadow-xl shadow-orange-600/30 flex items-center justify-center space-x-2 transition hover:scale-[1.02]"
            >
              <span>Lanjut ke Checkout</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
