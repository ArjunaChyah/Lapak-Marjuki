'use client';

import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({ searchQuery, onSearchChange, placeholder = "Cari Soto, Indomie, Es Teh, Gorengan..." }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400">
        <Search className="w-5 h-5 text-orange-500" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white dark:bg-zinc-800 border-2 border-orange-200 dark:border-zinc-700 text-stone-900 dark:text-white placeholder-stone-400 text-sm font-medium focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 shadow-sm transition-all"
      />
      {searchQuery && (
        <button
          onClick={() => onSearchChange('')}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-600 dark:hover:text-white transition"
          aria-label="Hapus Pencarian"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
