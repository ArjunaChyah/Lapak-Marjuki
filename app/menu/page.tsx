'use client';

import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '@/lib/config';
import { ProductCategory } from '@/lib/types';
import { FoodCard } from '@/components/FoodCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { SearchBar } from '@/components/SearchBar';
import { HowToOrderSection } from '@/components/HowToOrderSection';
import { Utensils, ArrowUpDown, Filter } from 'lucide-react';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high'>('popular');

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter(product => {
      const matchesCategory = selectedCategory === 'semua' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else {
      // Default: best sellers & featured first
      result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950 px-3 py-1 rounded-full">
          Daftar Menu Lengkap
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-white">
          Menu Warung Marjuki'S
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-base">
          Soto hangat, nasi rames lauk komplit, indomie gurih, minuman segar, dan gorengan mendoan renyah dibuat setiap hari.
        </p>
      </div>

      {/* Controls Container: Search, Filter, Sort */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-orange-100 dark:border-zinc-800 shadow-md space-y-6">
        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-orange-100 dark:border-zinc-800 pt-4">
          <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
            <ArrowUpDown className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-bold text-stone-600 dark:text-stone-400 whitespace-nowrap">Urutkan:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-2 px-3 rounded-xl bg-orange-50 dark:bg-zinc-800 text-stone-800 dark:text-stone-200 border border-orange-200 dark:border-zinc-700 text-xs font-bold focus:outline-none focus:border-orange-500"
            >
              <option value="popular">Terpopuler & Best Seller</option>
              <option value="price-low">Harga Terendah</option>
              <option value="price-high">Harga Tertinggi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Food Cards Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <FoodCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-stone-300 dark:border-zinc-800 p-8 space-y-4">
          <Filter className="w-12 h-12 text-stone-400 mx-auto" />
          <h3 className="text-xl font-bold text-stone-800 dark:text-stone-200">
            Tidak ada menu yang sesuai
          </h3>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Coba ubah kata kunci atau reset filter pencarian Anda.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('semua');
              setSearchQuery('');
            }}
            className="px-5 py-2.5 rounded-xl bg-orange-600 text-white font-bold text-xs hover:bg-orange-700 transition"
          >
            Reset Semua Filter
          </button>
        </div>
      )}

      {/* How to Order Guide */}
      <HowToOrderSection />

    </div>
  );
}
