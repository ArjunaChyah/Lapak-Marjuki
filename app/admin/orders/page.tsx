'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatRupiahCompact } from '@/lib/formatters';
import { ShoppingBag, ArrowLeft, Filter, CheckCircle2, Clock, Truck, PackageCheck, AlertCircle, RefreshCw } from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();

      if (data.success && Array.isArray(data.orders) && data.orders.length > 0) {
        setOrders(data.orders);
      } else {
        // Fallback demo items if database has no orders yet
        setOrders([
          {
            id: 'WM-849201',
            orderNumber: 'WM-849201',
            fullName: 'Budi Santoso',
            phoneNumber: '081234567890',
            deliveryAddress: 'Jl. Perbalan No. 12, Semarang',
            deliveryMethod: 'diantar',
            paymentMethod: 'qris',
            subtotal: 24000,
            status: 'CONFIRMED',
            createdAt: new Date().toISOString(),
            items: [{ product: { name: 'Soto Ayam' }, quantity: 2 }, { product: { name: 'Es Teh' }, quantity: 2 }],
          },
          {
            id: 'WM-849198',
            orderNumber: 'WM-849198',
            fullName: 'Siti Rahma',
            phoneNumber: '081987654321',
            deliveryAddress: 'Ambil Sendiri di Warung',
            deliveryMethod: 'ambil-sendiri',
            paymentMethod: 'transfer',
            subtotal: 18000,
            status: 'CONFIRMED',
            createdAt: new Date().toISOString(),
            items: [{ product: { name: 'Nasi Rames' }, quantity: 2 }, { product: { name: 'Es Jeruk' }, quantity: 1 }],
          },
        ]);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    // Optimistic UI update
    setOrders(prev =>
      prev.map(o => (o.id === orderId || o.orderNumber === orderId ? { ...o, status: newStatus } : o))
    );

    try {
      await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
    } catch (e) {
      console.error('Failed to update status in DB:', e);
    }
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
            Kelola Pesanan Masuk
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Daftar pesanan masuk real-time dari pelanggan. Perbarui status pesanan di sini.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchOrders}
            className="p-2.5 rounded-xl bg-orange-100 dark:bg-zinc-800 text-orange-600 dark:text-orange-400 hover:bg-orange-200 transition"
            title="Refresh Data Pesanan"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

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
      </div>

      {/* Orders List Cards */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12 text-stone-500 text-sm">
            Memuat pesanan masuk...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-12 text-center text-stone-500 space-y-3 border border-orange-100 dark:border-zinc-800">
            <ShoppingBag className="w-12 h-12 mx-auto text-stone-400" />
            <p className="font-bold text-base text-stone-900 dark:text-white">Belum Ada Pesanan Masuk</p>
            <p className="text-xs">Setiap pesanan baru yang dibuat oleh pelanggan di website akan otomatis muncul di sini.</p>
          </div>
        ) : (
          filteredOrders.map(order => {
            const orderId = order.orderNumber || order.id;
            const itemsText = order.items
              ? order.items.map((i: any) => `${i.Product?.name || i.product?.name || 'Menu'} x${i.quantity}`).join(', ')
              : 'Soto Ayam x1';

            return (
              <div
                key={orderId}
                className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-orange-100 dark:border-zinc-800 shadow-md space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-orange-100 dark:border-zinc-800 pb-3">
                  <div>
                    <span className="text-xs font-bold text-orange-600 dark:text-orange-400 mr-2">{orderId}</span>
                    <span className="text-xs text-stone-400">({new Date(order.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB)</span>
                    <h3 className="text-base font-bold text-stone-900 dark:text-white mt-0.5">
                      {order.fullName} — <span className="text-xs font-normal text-stone-500">{order.phoneNumber}</span>
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
                    <p className="font-bold text-stone-900 dark:text-white mt-1">{itemsText}</p>
                  </div>

                  <div>
                    <span className="text-xs text-stone-400 block font-semibold">Alamat & Pengiriman:</span>
                    <p className="mt-1">{order.deliveryAddress || 'Ambil Sendiri di Warung'}</p>
                  </div>

                  <div>
                    <span className="text-xs text-stone-400 block font-semibold">Total Tagihan:</span>
                    <p className="font-black text-orange-600 dark:text-orange-400 text-base mt-1">
                      {formatRupiahCompact(order.subtotal)} ({String(order.paymentMethod).toUpperCase()})
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
            );
          })
        )}
      </div>

    </div>
  );
}
