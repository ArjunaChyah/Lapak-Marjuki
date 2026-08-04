import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { STORE_CONFIG } from '@/lib/config';
import { Utensils, Heart, ShieldCheck, Clock, MapPin, Sparkles, ArrowRight } from 'lucide-react';

export const metadata = {
  title: "Tentang Kami",
  description: `Tentang Warung Marjuki'S milik Ibu Yulia di Semarang, Jawa Tengah. Menyajikan masakan rumahan lezat, murah, dan bersih.`,
};

export default function AboutPage() {
  const values = [
    {
      title: "Masakan Rumahan Asli",
      desc: "Diracik dengan resep khas Ibu Yulia menggunakan bumbu rempah segar nusantara setiap hari.",
      icon: <Utensils className="w-6 h-6 text-orange-600 dark:text-orange-400" />,
    },
    {
      title: "Harga Sangat Terjangkau",
      desc: "Menyediakan hidangan lezat dan mengenyangkan dengan harga ramah di kantong masyarakat.",
      icon: <Heart className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
    },
    {
      title: "Bersih & Higienis",
      desc: "Menjaga kualitas kebersihan bahan dan area dapur rumah dengan standar terbaik.",
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
    },
    {
      title: "Dibuat Segar Setiap Hari",
      desc: "Tanpa pengawet, semua menu dimasak segar setiap pagi untuk menjamin cita rasa terbaik.",
      icon: <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950 px-3 py-1 rounded-full">
          Profil Warung Rumahan
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-stone-900 dark:text-white">
          Tentang Warung Marjuki'S
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-base leading-relaxed">
          Warung makan rumahan milik Ibu Yulia yang menghadirkan kehangatan cita rasa masakan rumah di jantung kota Semarang.
        </p>
      </div>

      {/* Main Story & Image */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 sm:p-12 border border-orange-100 dark:border-zinc-800 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-lg border-2 border-orange-200">
          <Image
            src="/images/about.jpg"
            alt="Soto Ayam Warung Marjukis"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <span className="text-xs font-bold bg-orange-600 px-3 py-1 rounded-md">Semarang, Jawa Tengah</span>
            <p className="text-lg font-bold mt-1">Warung Marjuki'S Ibu Yulia</p>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-lg">
            <Sparkles className="w-4 h-4" />
            <span>Kisah Warung Kami</span>
          </div>

          <p className="text-stone-700 dark:text-stone-300 text-base leading-relaxed">
            Warung Marjuki'S merupakan warung makan rumahan milik Ibu Yulia yang berlokasi di JL. Jomblang Perbalan No.800 RT 02 RW 01, Semarang, Jawa Tengah. Kami menyediakan berbagai makanan rumahan, minuman segar, dan gorengan dengan harga yang terjangkau serta cita rasa yang lezat.
          </p>

          <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
            Didirikan langsung di depan kediaman keluarga Ibu Yulia, Warung Marjuki'S selalu berkomitmen memberikan pelayanan hangat layaknya menyajikan makanan untuk keluarga sendiri. Setiap porsi Soto Ayam, Nasi Rames, Indomie, hingga Tempe Mendoan dibuat segar saban hari.
          </p>

          <div className="pt-2 flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-stone-600 dark:text-stone-400">
              <MapPin className="w-4 h-4 text-orange-600" />
              <span>Semarang, Jawa Tengah</span>
            </div>
            <div className="flex items-center space-x-2 text-xs font-bold text-stone-600 dark:text-stone-400">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>06.00 - 21.00 WIB</span>
            </div>
          </div>
        </div>
      </div>

      {/* Values Grid */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">
            Keunggulan Warung Marjuki'S
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm mt-1">
            Mengapa pelanggan setia memilih santapan rumahan dari Ibu Yulia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div
              key={i}
              className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-orange-100 dark:border-zinc-800 shadow-md space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-zinc-800 flex items-center justify-center">
                {v.icon}
              </div>
              <h3 className="font-bold text-base text-stone-900 dark:text-white">{v.title}</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-black">
          Lapar & Ingin Santapan Rumahan Lezat?
        </h2>
        <p className="text-orange-100 text-sm max-w-lg mx-auto">
          Pesan sekarang via website atau WhatsApp, kami siap menyajikan soto dan nasi rames hangat untuk Anda.
        </p>
        <div className="pt-2">
          <Link
            href="/menu"
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-2xl bg-amber-400 text-stone-950 font-black text-sm hover:bg-amber-300 transition shadow-lg"
          >
            <span>Lihat Menu & Pesan</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}
