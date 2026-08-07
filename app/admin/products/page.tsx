'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/lib/config';
import { Product } from '@/lib/types';
import { formatRupiahCompact } from '@/lib/formatters';
import { ArrowLeft, Plus, Edit2, Flame, Star, CheckCircle2 } from 'lucide-react';

export default function AdminProductsPage() {
  const [productList, setProductList] = useState<Product[]>(PRODUCTS);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const toggleBestSeller = (productId: string) => {
    setProductList(prev =>
      prev.map(p => (p.id === productId ? { ...p, isBestSeller: !p.isBestSeller } : p))
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-orange-100 dark:border-zinc-800 pb-6">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Dashboard</span>
          </Link>
          <h1 className="text-3xl font-black text-stone-900 dark:text-white">
            Kelola Menu & Harga (Admin Ibu Yulia)
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Atur daftar makanan, minuman, harga porsi, serta status Best Seller.
          </p>
        </div>

        <button
          onClick={() => alert('Fitur tambah menu baru siap dihubungkan ke MySQL!')}
          className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-extrabold shadow-md flex items-center space-x-2 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Menu Baru</span>
        </button>
      </div>

      {/* Product List Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {productList.map(product => (
          <div
            key={product.id}
            className="bg-white dark:bg-zinc-900 rounded-3xl p-5 border border-orange-100 dark:border-zinc-800 shadow-md flex flex-col justify-between space-y-4"
          >
            <div className="flex items-start space-x-4">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-stone-100 dark:bg-zinc-800 flex-shrink-0">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-bold uppercase text-orange-600 dark:text-orange-400">
                  {product.category}
                </span>
                <h3 className="font-bold text-stone-900 dark:text-white text-base truncate">
                  {product.name}
                </h3>
                <p className="text-lg font-black text-orange-600 dark:text-orange-400 mt-1">
                  {formatRupiahCompact(product.price)}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-orange-100 dark:border-zinc-800 flex items-center justify-between">
              <button
                onClick={() => toggleBestSeller(product.id)}
                className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center space-x-1 transition ${
                  product.isBestSeller
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    : 'bg-stone-100 text-stone-600 dark:bg-zinc-800 dark:text-stone-400'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>{product.isBestSeller ? 'Best Seller' : 'Tandai Best Seller'}</span>
              </button>

              <button
                onClick={() => alert(`Edit ${product.name}`)}
                className="p-2 rounded-xl bg-orange-50 dark:bg-zinc-800 text-orange-600 dark:text-orange-400 hover:bg-orange-100 transition"
                aria-label="Edit Menu"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
