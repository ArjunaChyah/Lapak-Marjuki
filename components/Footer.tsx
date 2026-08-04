import React from 'react';
import Link from 'next/link';
import { STORE_CONFIG } from '@/lib/config';
import { Utensils, MapPin, Phone, Clock, ExternalLink, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-orange-900/50 pt-16 pb-12 mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md">
                <Utensils className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-2xl text-white tracking-tight">
                {STORE_CONFIG.name}
              </span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              Warung makan rumahan milik Ibu Yulia di Semarang. Menyediakan makanan rumahan lezat, murah, bersih, dan segar yang dibuat setiap hari.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-950 text-orange-400 border border-orange-800">
                Resep Asli Ibu Yulia
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 border-b border-stone-800 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-orange-400 transition flex items-center space-x-2">
                  <span>› Home</span>
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-orange-400 transition flex items-center space-x-2">
                  <span>› Menu Makanan & Minuman</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-400 transition flex items-center space-x-2">
                  <span>› Tentang Warung Marjuki'S</span>
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-orange-400 transition flex items-center space-x-2">
                  <span>› Keranjang Belanja</span>
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-orange-400 transition flex items-center space-x-2">
                  <span>› Form Pemesanan</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-400 transition flex items-center space-x-2">
                  <span>› Lokasi & Kontak</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 border-b border-stone-800 pb-2">
              Alamat & Kontak
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-stone-300">
                  {STORE_CONFIG.address.fullAddress}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <a
                  href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline font-semibold"
                >
                  WhatsApp: +{STORE_CONFIG.whatsappNumber}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-stone-200">Jam Buka:</span>
                  <span className="text-stone-400">{STORE_CONFIG.openingHours}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Google Maps link */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 border-b border-stone-800 pb-2">
              Google Maps
            </h3>
            <p className="text-sm text-stone-400 mb-4">
              Lokasi tepat di depan rumah Ibu Yulia di Jomblang Perbalan, Semarang.
            </p>
            <a
              href={STORE_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 w-full px-4 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold shadow-lg shadow-orange-600/30 transition group"
            >
              <span>Petunjuk Arah Google Maps</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-14 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 space-y-4 sm:space-y-0">
          <p>© 2026 {STORE_CONFIG.name}. Hak Cipta Akan Selalu Dilindungi.</p>
          <p className="flex items-center space-x-1">
            <span>Dibuat oleh</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Arjuna GG Gaming</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
