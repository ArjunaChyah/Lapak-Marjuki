'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { formatRupiahCompact } from '@/lib/formatters';
import { ShoppingBag, ArrowLeft, Filter, CheckCircle2, Clock, Truck, PackageCheck, AlertCircle } from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([
    {
      id: 'WM-849201',
      fullName: 'Budi Santoso',
      phone: '081234567890',
      address: 'Jl. Perbalan No. 12, Semarang',
      deliveryMethod: 'diantar',
      paymentMethod: 'qris',
      total: 24000,
      status: 'CONFIRMED',
      items: 'Soto Ayam x2, Es Teh x2',
      time: '10 menit lalu',
    },
    {
      id: 'WM-849198',
      fullName: 'Siti Rahma',
      phone: '081987654321',
      address: 'Ambil Sendiri di Warung',
      deliveryMethod: 'ambil-sendiri',
      paymentMethod: 'transfer',
      total: 18000,
      status: 'CONFIRMED',
      items: 'Nasi Rames x2, Es Jeruk x1',
      time: '25 menit lalu',
    },
    {
      id: 'WM-849195',
      fullName: 'Dewi Lestari',
      phone: '085712345678',
      address: 'Jl. Jomblang Barat No. 44, Semarang',
      deliveryMethod: 'diantar',
      paymentMethod: 'cash',
      total: 32000,
      status: 'PENDING',
      items: 'Indomie Telur x2, Mendoan x4',
      time: '40 menit lalu',
    },
  ]);

  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const filteredOrders = orders.filter(o => {
    if (filterStatus === 'ALL') return true;
    return o.status === filterStatus;
  });

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
            Kelola Pesanan Masuk (Admin Ibu Yulia)
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Lihat rincian pesanan, status pembayaran Midtrans, dan perbarui status pengerjaan.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center space-x-2 overflow-x-auto py-1">
          <button
            onClick={() => setFilterStatus('ALL')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              filterStatus === 'ALL'
                ? 'bg-orange-600 text-white'
                : 'bg-stone-100 dark:bg-zinc-800 text-stone-700 dark:text-stone-300'
            }`}
          >
            Semua ({orders.length})
          </button>
          <button
            onClick={() => setFilterStatus('PENDING')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              filterStatus === 'PENDING'
                ? 'bg-amber-500 text-white'
                : 'bg-stone-100 dark:bg-zinc-800 text-stone-700 dark:text-stone-300'
            }`}
          >
            Pending ({orders.filter(o => o.status === 'PENDING').length})
          </button>
          <button
            onClick={() => setFilterStatus('CONFIRMED')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              filterStatus === 'CONFIRMED'
                ? 'bg-emerald-600 text-white'
                : 'bg-stone-100 dark:bg-zinc-800 text-stone-700 dark:text-stone-300'
            }`}
          >
            Dikonfirmasi ({orders.filter(o => o.status === 'CONFIRMED').length})
          </button>
        </div>
      </div>

      {/* Orders List Cards */}
      <div className="space-y-4">
        {filteredOrders.map(order => (
          <div
            key={order.id}
            className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-orange-100 dark:border-zinc-800 shadow-md space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-orange-100 dark:border-zinc-800 pb-3">
              <div>
                <span className="text-xs font-bold text-orange-600 dark:text-orange-400 mr-2">{order.id}</span>
                <span className="text-xs text-stone-400">({order.time})</span>
                <h3 className="text-base font-bold text-stone-900 dark:text-white mt-0.5">
                  {order.fullName} — <span className="text-xs font-normal text-stone-500">{order.phone}</span>
                </h3>
              </div>

              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                  order.status === 'CONFIRMED'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : order.status === 'PENDING'
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                }`}>
                  Status: {order.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
              <div>
                <span className="text-xs text-stone-400 block font-semibold">Detail Menu Pesanan:</span>
                <p className="font-bold text-stone-900 dark:text-white mt-1">{order.items}</p>
              </div>

              <div>
                <span className="text-xs text-stone-400 block font-semibold">Alamat & Pengiriman:</span>
                <p className="mt-1">{order.address}</p>
              </div>

              <div>
                <span className="text-xs text-stone-400 block font-semibold">Total Tagihan (Midtrans):</span>
                <p className="font-black text-orange-600 dark:text-orange-400 text-base mt-1">
                  {formatRupiahCompact(order.total)} ({order.paymentMethod.toUpperCase()})
                </p>
              </div>
            </div>

            {/* Admin Actions */}
            <div className="pt-3 border-t border-orange-100 dark:border-zinc-800 flex flex-wrap items-center justify-end gap-2">
              <span className="text-xs font-semibold text-stone-500 mr-2">Ubah Status Pesanan:</span>
              <button
                onClick={() => updateOrderStatus(order.id, 'CONFIRMED')}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition"
              >
                Konfirmasi (Lunas)
              </button>
              <button
                onClick={() => updateOrderStatus(order.id, 'DIPROSES')}
                className="px-3 py-1.5 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition"
              >
                Sedang Dimasak
              </button>
              <button
                onClick={() => updateOrderStatus(order.id, 'COMPLETED')}
                className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition"
              >
                Selesai / Terkirim
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
