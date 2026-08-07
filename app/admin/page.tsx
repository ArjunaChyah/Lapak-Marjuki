'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { STORE_CONFIG, PRODUCTS } from '@/lib/config';
import { formatRupiahCompact } from '@/lib/formatters';
import { ShoppingBag, TrendingUp, Clock, CheckCircle2, PackageCheck, Users, ShieldCheck, ArrowUpRight, CreditCard, Lock, LogOut } from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { role, user, logout } = useAuth();

  const [stats, setStats] = useState({
    totalRevenue: 248000,
    totalOrders: 18,
    pendingOrders: 3,
    completedOrders: 15,
  });

  if (role !== 'admin') {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-stone-900 dark:text-white">
          Akses Khusus Admin / Ibu Yulia
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
          Anda harus login sebagai Admin untuk mengakses Dashboard Pengelola {STORE_CONFIG.name}.
        </p>
        <Link
          href="/admin/login"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-600/30"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Login Admin Sekarang</span>
        </Link>
      </div>
    );
  }

  const recentOrders = [
    { id: 'WM-849201', customer: 'Budi Santoso', total: 24000, method: 'QRIS', status: 'CONFIRMED', time: '10 menit lalu' },
    { id: 'WM-849198', customer: 'Siti Rahma', total: 18000, method: 'Transfer BCA', status: 'CONFIRMED', time: '25 menit lalu' },
    { id: 'WM-849195', customer: 'Dewi Lestari', total: 32000, method: 'Cash / Tunai', status: 'PENDING', time: '40 menit lalu' },
    { id: 'WM-849190', customer: 'Rudi Hermawan', total: 16000, method: 'QRIS', status: 'COMPLETED', time: '1 jam lalu' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-orange-100 dark:border-zinc-800 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-orange-100 dark:bg-orange-950/80 px-3 py-1 rounded-full text-xs font-black uppercase text-orange-600 dark:text-orange-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Dashboard Pemilik / Admin</span>
          </div>
          <h1 className="text-3xl font-black text-stone-900 dark:text-white mt-2">
            Panel Pengelola {STORE_CONFIG.name}
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Selamat datang Ibu Yulia. Pantau pesanan masuk, pendapatan, dan stok menu hari ini.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/orders"
            className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-extrabold shadow-md flex items-center space-x-2 transition"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Kelola Pesanan</span>
          </Link>
          <Link
            href="/admin/products"
            className="px-5 py-2.5 rounded-xl bg-stone-100 dark:bg-zinc-800 text-stone-800 dark:text-stone-200 text-xs font-extrabold hover:bg-stone-200 dark:hover:bg-zinc-700 transition"
          >
            <span>Kelola Menu</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-orange-100 dark:border-zinc-800 shadow-md flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-500 dark:text-stone-400 font-semibold">Total Pendapatan Hari Ini</span>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
              {formatRupiahCompact(stats.totalRevenue)}
            </div>
            <span className="text-[11px] text-emerald-600 font-bold flex items-center mt-1">
              <TrendingUp className="w-3.5 h-3.5 mr-1" /> +14.2% dari kemarin
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-orange-100 dark:border-zinc-800 shadow-md flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-500 dark:text-stone-400 font-semibold">Total Pesanan</span>
            <div className="text-2xl font-black text-stone-900 dark:text-white mt-1">
              {stats.totalOrders} Pesanan
            </div>
            <span className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 block">Hari ini</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-zinc-800 text-orange-600 dark:text-orange-400 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-orange-100 dark:border-zinc-800 shadow-md flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-500 dark:text-stone-400 font-semibold">Perlu Diproses</span>
            <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
              {stats.pendingOrders} Pesanan
            </div>
            <span className="text-[11px] text-amber-600 font-bold mt-1 block">Segera siapkan</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-orange-100 dark:border-zinc-800 shadow-md flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-500 dark:text-stone-400 font-semibold">Pesanan Selesai</span>
            <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
              {stats.completedOrders} Pesanan
            </div>
            <span className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 block">Telah diterima</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <PackageCheck className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Recent Orders Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-orange-100 dark:border-zinc-800 shadow-md space-y-6">
        <div className="flex items-center justify-between border-b border-orange-100 dark:border-zinc-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-white">
              Pesanan Masuk Terbaru (Midtrans Payment Verified)
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Daftar pesanan pelanggan beserta status pembayaran Midtrans.
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline flex items-center space-x-1"
          >
            <span>Lihat Semua</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-orange-100 dark:border-zinc-800 text-stone-500 dark:text-stone-400">
                <th className="py-3 px-2">No. Nota</th>
                <th className="py-3 px-2">Pelanggan</th>
                <th className="py-3 px-2">Pembayaran</th>
                <th className="py-3 px-2">Total</th>
                <th className="py-3 px-2">Status</th>
                <th className="py-3 px-2">Waktu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-100 dark:divide-zinc-800">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-orange-50/50 dark:hover:bg-zinc-800/50 transition">
                  <td className="py-3.5 px-2 font-bold text-orange-600 dark:text-orange-400">{order.id}</td>
                  <td className="py-3.5 px-2 font-medium text-stone-900 dark:text-white">{order.customer}</td>
                  <td className="py-3.5 px-2 text-stone-600 dark:text-stone-300">{order.method}</td>
                  <td className="py-3.5 px-2 font-extrabold text-stone-900 dark:text-white">{formatRupiahCompact(order.total)}</td>
                  <td className="py-3.5 px-2">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      order.status === 'CONFIRMED'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : order.status === 'PENDING'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-2 text-stone-400 text-xs">{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
