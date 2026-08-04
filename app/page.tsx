'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { STORE_CONFIG, PRODUCTS } from '@/lib/config';
import { ProductCategory } from '@/lib/types';
import { FoodCard } from '@/components/FoodCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { SearchBar } from '@/components/SearchBar';
import { HowToOrderSection } from '@/components/HowToOrderSection';
import { ShoppingBag, ArrowRight, Utensils, MapPin, Clock, Star, Flame, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on search query & category
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'semua' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const bestSellers = PRODUCTS.filter(p => p.isBestSeller);

  return (
    <div className="space-y-16 pb-12">
      
      {/* 1. HERO BANNER SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-amber-600 to-amber-700 text-white rounded-3xl mx-4 sm:mx-8 lg:mx-12 mt-6 shadow-2xl">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-amber-400/20 backdrop-blur-md border border-amber-300/30 px-4 py-1.5 rounded-full text-amber-200 text-xs font-black tracking-wide uppercase">
              <Flame className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>Warung Makan Rumahan Ibu Yulia • Semarang</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              {STORE_CONFIG.tagline}
            </h1>

            <p className="text-lg sm:text-xl text-orange-100 font-medium max-w-2xl leading-relaxed">
              {STORE_CONFIG.subtitle}
            </p>

            {/* Feature Highlights Pill Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-white/90">
              <span className="flex items-center space-x-1.5 bg-black/20 px-3 py-1.5 rounded-xl backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span>100% Halal & Higienis</span>
              </span>
              <span className="flex items-center space-x-1.5 bg-black/20 px-3 py-1.5 rounded-xl backdrop-blur-sm">
                <HeartHandshake className="w-4 h-4 text-amber-300" />
                <span>Harga Terjangkau (Mulai Rp 1.500)</span>
              </span>
              <span className="flex items-center space-x-1.5 bg-black/20 px-3 py-1.5 rounded-xl backdrop-blur-sm">
                <Clock className="w-4 h-4 text-amber-300" />
                <span>Buka Setiap Hari 06.00 - 21.00</span>
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/menu"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-base shadow-xl hover:scale-105 transition duration-200 flex items-center justify-center space-x-3 group"
              >
                <ShoppingBag className="w-5 h-5 text-stone-950" />
                <span>Pesan Sekarang</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/menu"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-base backdrop-blur-md transition duration-200 flex items-center justify-center space-x-2"
              >
                <Utensils className="w-5 h-5" />
                <span>Lihat Menu</span>
              </Link>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto w-full max-w-md h-80 sm:h-96 lg:h-[420px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 transform lg:rotate-2 hover:rotate-0 transition duration-500">
              <Image
                src="/images/hero.jpg"
                alt="Soto Ayam Warung Marjukis"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                <p className="text-xs font-bold text-amber-300 uppercase tracking-widest">Menu Favorit</p>
                <p className="text-xl font-black">Soto Ayam Rumahan & Es Teh</p>
                <p className="text-xs text-stone-200 mt-1">Hangat, gurih, dan siap mengenyangkan hari Anda.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. QUICK SEARCH & CATEGORY FILTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">
            Pilihan Menu Lezat Ibu Yulia
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm">
            Temukan makanan rumahan, minuman segar, dan gorengan hangat kesukaan Anda.
          </p>
        </div>

        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
      </section>

      {/* 3. MENU FOOD GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <FoodCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-stone-300 dark:border-zinc-800 p-8">
            <Utensils className="w-12 h-12 text-stone-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200">
              Menu tidak ditemukan
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
              Coba kata kunci lain atau pilih kategori menu di atas.
            </p>
          </div>
        )}
      </section>

      {/* 4. BEST SELLER SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 dark:from-zinc-900 dark:to-zinc-900 p-8 sm:p-12 rounded-3xl border border-orange-200 dark:border-zinc-800 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-black uppercase text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950 px-3 py-1 rounded-full">
                <Flame className="w-4 h-4 fill-orange-600 text-orange-600 dark:fill-orange-400 dark:text-orange-400" />
                <span>Paling Laris</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mt-2">
                Best Seller Warung Marjuki'S
              </h2>
            </div>
            <Link
              href="/menu"
              className="text-sm font-bold text-orange-600 dark:text-orange-400 hover:underline flex items-center space-x-1"
            >
              <span>Lihat Semua Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <FoodCard key={`bestseller-${product.id}`} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW TO ORDER SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HowToOrderSection />
      </div>

      {/* 6. ABOUT PREVIEW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 sm:p-12 border border-orange-100 dark:border-zinc-800 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5 relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-lg border-2 border-orange-200">
            <Image
              src="/images/about.jpg"
              alt="Masakan Rumahan Ibu Yulia"
              fill
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950 px-3 py-1 rounded-full">
              Tentang Warung Marjuki'S
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900 dark:text-white">
              Kuliner Rumahan Ibu Yulia di Semarang
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
              Warung Marjuki'S merupakan warung makan rumahan milik Ibu Yulia yang berlokasi di JL. Jomblang Perbalan No.800 RT 02 RW 01, Semarang, Jawa Tengah. Kami menyediakan berbagai makanan rumahan, minuman segar, dan gorengan dengan harga yang terjangkau serta cita rasa yang lezat.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold shadow-md transition"
              >
                <span>Baca Selengkapnya</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 7. CONTACT PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-orange-600 rounded-2xl text-white">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Alamat</h3>
              <p className="text-xs text-stone-400 mt-1">{STORE_CONFIG.address.fullAddress}</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="p-3 bg-amber-500 rounded-2xl text-stone-950">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Jam Buka</h3>
              <p className="text-xs text-stone-400 mt-1">{STORE_CONFIG.openingHours}</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="p-3 bg-emerald-600 rounded-2xl text-white">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Pemesanan WA</h3>
              <p className="text-xs text-stone-400 mt-1">Layanan pesan antar & ambil sendiri langsung ke WA Ibu Yulia.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
