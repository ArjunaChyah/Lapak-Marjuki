'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { formatRupiahCompact } from '@/lib/formatters';
import { Plus, Minus, ShoppingCart, Flame, Star } from 'lucide-react';

interface FoodCardProps {
  product: Product;
}

export function FoodCard({ product }: FoodCardProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity);
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 400);
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'makanan':
        return 'bg-orange-100 dark:bg-orange-950/80 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800';
      case 'minuman':
        return 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'gorengan':
        return 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      default:
        return 'bg-stone-100 text-stone-700';
    }
  };

  return (
    <div className="group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-orange-100 dark:border-zinc-800 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Product Image Header */}
        <div className="relative h-48 w-full overflow-hidden bg-orange-50 dark:bg-zinc-800">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
          
          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            <span className={`px-2.5 py-1 text-xs font-bold capitalize rounded-lg border backdrop-blur-md shadow-sm ${getCategoryBadgeColor(product.category)}`}>
              {product.category}
            </span>
            {product.isBestSeller && (
              <span className="px-2.5 py-1 text-xs font-extrabold bg-gradient-to-r from-orange-600 to-amber-500 text-white rounded-lg shadow-md flex items-center space-x-1">
                <Flame className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                <span>Best Seller</span>
              </span>
            )}
          </div>

          {product.isFeatured && !product.isBestSeller && (
            <div className="absolute top-3 right-3 z-10">
              <span className="p-1.5 bg-amber-400 text-stone-900 rounded-lg shadow-md flex items-center justify-center">
                <Star className="w-4 h-4 fill-stone-900" />
              </span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-stone-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-1.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Price */}
          <div className="mt-4 flex items-baseline justify-between">
            <div>
              <span className="text-xs text-stone-600 dark:text-stone-400 font-medium">Harga</span>
              <div className="text-xl font-extrabold text-orange-600 dark:text-orange-400">
                {formatRupiahCompact(product.price)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer: Quantity Selector & Add to Cart */}
      <div className="p-5 pt-0 mt-auto">
        <div className="flex items-center justify-between space-x-3 pt-3 border-t border-orange-100 dark:border-zinc-800">
          
          {/* Quantity Controls */}
          <div className="flex items-center bg-orange-50 dark:bg-zinc-800 rounded-xl p-1 border border-orange-200/60 dark:border-zinc-700">
            <button
              onClick={handleDecrement}
              className="w-7 h-7 rounded-lg bg-white dark:bg-zinc-700 flex items-center justify-center text-stone-700 dark:text-stone-200 hover:bg-orange-100 dark:hover:bg-zinc-600 transition shadow-sm"
              aria-label="Kurangi Jumlah"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-extrabold text-stone-800 dark:text-stone-100">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="w-7 h-7 rounded-lg bg-white dark:bg-zinc-700 flex items-center justify-center text-stone-700 dark:text-stone-200 hover:bg-orange-100 dark:hover:bg-zinc-600 transition shadow-sm"
              aria-label="Tambah Jumlah"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm text-white flex items-center justify-center space-x-1.5 shadow-lg transition-all duration-200 ${
              isAdding
                ? 'bg-emerald-600 scale-95'
                : 'bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-500 shadow-orange-600/20 active:scale-95'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{isAdding ? 'Ditambahkan!' : 'Tambah'}</span>
          </button>

        </div>
      </div>
    </div>
  );
}
