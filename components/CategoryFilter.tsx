'use client';

import React from 'react';
import { ProductCategory } from '@/lib/types';
import { Utensils, Coffee, Cookie, Sparkles } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
}

export function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  const categories: { id: ProductCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'semua', label: 'Semua Menu', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'makanan', label: 'Makanan', icon: <Utensils className="w-4 h-4" /> },
    { id: 'minuman', label: 'Minuman', icon: <Coffee className="w-4 h-4" /> },
    { id: 'gorengan', label: 'Gorengan', icon: <Cookie className="w-4 h-4" /> },
  ];

  return (
    <div className="flex items-center justify-center space-x-2 sm:space-x-3 overflow-x-auto py-2 px-1 no-scrollbar">
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 ${
              isSelected
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30 scale-105'
                : 'bg-white dark:bg-zinc-800 text-stone-700 dark:text-stone-300 hover:bg-orange-100 dark:hover:bg-zinc-700 border border-orange-100 dark:border-zinc-700'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}
