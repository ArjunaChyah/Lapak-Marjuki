'use client';

import React, { useState } from 'react';
import { STORE_CONFIG } from '@/lib/config';
import { MapPin, Clock, Phone, MessageCircle, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [inquiry, setInquiry] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiry.name || !inquiry.message) return;

    const waMsg = `Halo Ibu Yulia (Warung Marjuki'S),\nSaya ${inquiry.name} (${inquiry.phone || '-'}).\n\nPesan: ${inquiry.message}`;
    const waUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(waMsg)}`;
    
    window.open(waUrl, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950 px-3 py-1 rounded-full">
          Lokasi & Kontak
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-white">
          Hubungi Warung Marjuki'S
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base">
          Silakan datang langsung ke warung kami atau hubungi via WhatsApp untuk pemesanan & pertanyaan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Store Information Cards */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Address Card */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-orange-100 dark:border-zinc-800 shadow-md space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-zinc-800 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <MapPin className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-white">Alamat Lengkap</h2>
            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              {STORE_CONFIG.address.street} {STORE_CONFIG.address.rtRw}<br />
              {STORE_CONFIG.address.city}, {STORE_CONFIG.address.province}<br />
              {STORE_CONFIG.address.country}
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 italic pt-1">
              (Tepat di depan rumah Ibu Yulia)
            </p>
          </div>

          {/* Opening Hours Card */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-orange-100 dark:border-zinc-800 shadow-md space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-zinc-800 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Clock className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-white">Jam Operasional</h2>
            <div className="text-sm text-stone-600 dark:text-stone-300 space-y-1">
              <p className="font-semibold text-orange-600 dark:text-orange-400">Senin - Minggu</p>
              <p>06.00 - 21.00 WIB</p>
            </div>
          </div>

          {/* WhatsApp & Phone Card */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-orange-100 dark:border-zinc-800 shadow-md space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-zinc-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-white">Telepon & WhatsApp</h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-stone-400" />
                <span className="text-stone-700 dark:text-stone-300">{STORE_CONFIG.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <a
                  href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                >
                  +{STORE_CONFIG.whatsappNumber} (Klik untuk chat)
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Google Maps Embed & Quick Inquiry Form */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Embedded Google Maps Placeholder */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-4 border border-orange-100 dark:border-zinc-800 shadow-md overflow-hidden">
            <h3 className="text-sm font-bold text-stone-800 dark:text-stone-200 mb-3 px-2 flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-orange-600" />
              <span>Peta Lokasi Google Maps</span>
            </h3>
            <div className="relative w-full h-72 rounded-2xl overflow-hidden border border-orange-100 dark:border-zinc-800">
              <iframe
                title="Google Maps Warung Marjukis"
                src={STORE_CONFIG.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-orange-100 dark:border-zinc-800 shadow-md space-y-5">
            <h2 className="text-xl font-bold text-stone-900 dark:text-white">
              Kirim Pesan / Pertanyaan
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Pesan Anda akan diteruskan secara instan ke WhatsApp Ibu Yulia.
            </p>

            {submitted && (
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Pesan berhasil dikirim via WhatsApp!</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Nama Anda <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan nama"
                  value={inquiry.name}
                  onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-orange-50/50 dark:bg-zinc-800 border border-orange-200 dark:border-zinc-700 text-sm text-stone-900 dark:text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Nomor HP / WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="0812xxxxxxxx"
                  value={inquiry.phone}
                  onChange={(e) => setInquiry({ ...inquiry, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-orange-50/50 dark:bg-zinc-800 border border-orange-200 dark:border-zinc-700 text-sm text-stone-900 dark:text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Pesan / Pertanyaan <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tuliskan pertanyaan atau informasi katering / pesanan..."
                  value={inquiry.message}
                  onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-orange-50/50 dark:bg-zinc-800 border border-orange-200 dark:border-zinc-700 text-sm text-stone-900 dark:text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md flex items-center justify-center space-x-2 transition"
              >
                <Send className="w-4 h-4" />
                <span>Kirim via WhatsApp</span>
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}
