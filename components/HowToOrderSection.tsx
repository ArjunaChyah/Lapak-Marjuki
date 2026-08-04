import React from 'react';
import { ShoppingBag, FileText, Send, CheckCircle } from 'lucide-react';

export function HowToOrderSection() {
  const steps = [
    {
      step: '01',
      title: 'Pilih Menu',
      description: 'Pilih menu makanan, minuman, dan gorengan favorit Anda lalu tambahkan ke keranjang.',
      icon: <ShoppingBag className="w-6 h-6 text-orange-600 dark:text-orange-400" />,
    },
    {
      step: '02',
      title: 'Isi Detail',
      description: 'Isi nama, no HP, alamat pengiriman/ambil sendiri, serta catatan khusus pesanan.',
      icon: <FileText className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
    },
    {
      step: '03',
      title: 'Kirim via WA',
      description: 'Klik tombol "Pesan Sekarang" untuk mengirim rincian otomatis ke WhatsApp Ibu Yulia.',
      icon: <Send className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
    },
    {
      step: '04',
      title: 'Pesanan Diproses',
      description: 'Pesanan rumahan hangat siap disiapkan atau diantar sesuai jadwal Anda.',
      icon: <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    },
  ];

  return (
    <section id="cara-pemesanan" className="py-16 bg-gradient-to-b from-orange-100/50 to-white dark:from-zinc-900/50 dark:to-zinc-950 rounded-3xl p-6 sm:p-10 border border-orange-200/60 dark:border-zinc-800 my-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950/80 px-3 py-1 rounded-full">
          Kemudahan Bertransaksi
        </span>
        <h2 className="text-3xl font-extrabold text-stone-900 dark:text-white mt-3">
          Cara Pemesanan di Warung Marjuki'S
        </h2>
        <p className="text-stone-600 dark:text-stone-400 text-sm mt-2">
          Pesan makanan rumahan lezat khas Semarang hanya dalam 4 langkah mudah.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((item, index) => (
          <div
            key={index}
            className="relative bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-orange-100 dark:border-zinc-800 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="absolute top-4 right-4 text-3xl font-black text-orange-200 dark:text-zinc-800">
              {item.step}
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
