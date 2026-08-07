'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { formatRupiahCompact } from '@/lib/formatters';
import { DeliveryMethod, PaymentMethod, OrderDetails } from '@/lib/types';
import { STORE_CONFIG } from '@/lib/config';
import { ShoppingBag, CreditCard, User, Phone, MapPin, FileText, Banknote, QrCode, Truck, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<OrderDetails>({
    fullName: '',
    phoneNumber: '',
    deliveryAddress: '',
    notes: '',
    deliveryMethod: 'diantar',
    paymentMethod: 'qris',
  });

  const [errors, setErrors] = useState<{ fullName?: string; phoneNumber?: string; deliveryAddress?: string }>({});

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <ShoppingBag className="w-16 h-16 text-stone-400 mx-auto" />
        <h1 className="text-2xl font-bold text-stone-900 dark:text-white">
          Keranjang Anda Kosong
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400">
          Silakan pilih produk terlebih dahulu sebelum melakukan checkout.
        </p>
        <Link
          href="/menu"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-orange-600 text-white font-bold text-sm shadow-md"
        >
          <span>Pilih Menu Sekarang</span>
        </Link>
      </div>
    );
  }

  const deliveryFee = formData.deliveryMethod === 'diantar' ? 5000 : 0;
  const grandTotal = subtotal + deliveryFee;

  const validateForm = () => {
    const newErrors: { fullName?: string; phoneNumber?: string; deliveryAddress?: string } = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nama lengkap wajib diisi.';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Nomor telepon / WA wajib diisi.';
    }
    if (formData.deliveryMethod === 'diantar' && !formData.deliveryAddress.trim()) {
      newErrors.deliveryAddress = 'Alamat pengiriman wajib diisi untuk layanan diantar.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOrderSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      // CASH / TUNAI PAYMENT: Process directly without Midtrans Payment Gateway
      if (formData.paymentMethod === 'cash') {
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cart, orderDetails: formData }),
        });

        const data = await res.json();
        const orderNumber = data.orderNumber || `WM-${Date.now().toString().slice(-6)}`;

        sessionStorage.setItem('last_order', JSON.stringify({
          orderNumber,
          cart,
          subtotal,
          deliveryFee,
          grandTotal,
          orderDetails: formData,
          timestamp: new Date().toISOString()
        }));

        clearCart();
        router.push(`/order-success?order_id=${orderNumber}&payment=cash`);
        return;
      }

      // ONLINE PAYMENT (QRIS / Virtual Account): Process via Midtrans Payment Gateway
      const res = await fetch('/api/payments/snap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart, orderDetails: formData }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Gagal memproses pembayaran Midtrans');
      }

      sessionStorage.setItem('last_order', JSON.stringify({
        orderNumber: data.orderNumber,
        cart,
        subtotal,
        deliveryFee,
        grandTotal,
        orderDetails: formData,
        midtransToken: data.token,
        redirectUrl: data.redirectUrl,
        timestamp: new Date().toISOString()
      }));

      clearCart();

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        router.push(`/order-success?order_id=${data.orderNumber}`);
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      alert(err.message || 'Terjadi kesalahan saat memproses pesanan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-3.5 py-1 rounded-full">
          Midtrans Payment Gateway Integrated
        </span>
        <h1 className="text-3xl font-black text-stone-900 dark:text-white">
          Pembayaran Online Warung Marjuki'S
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-sm">
          Isi detail penerima dan bayar aman menggunakan QRIS, GoPay, Transfer Bank BCA/Mandiri, atau Cash.
        </p>
      </div>

      <form onSubmit={handleOrderSubmission} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Input Details */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. Customer Information */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-orange-100 dark:border-zinc-800 shadow-md space-y-5">
            <div className="flex items-center space-x-3 border-b border-orange-100 dark:border-zinc-800 pb-4">
              <User className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              <h2 className="text-xl font-bold text-stone-900 dark:text-white">
                Data Pemesan
              </h2>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                Nama Lengkap <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Contoh: Budi Santoso"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-orange-50/50 dark:bg-zinc-800 border text-sm text-stone-900 dark:text-white focus:outline-none ${
                    errors.fullName ? 'border-rose-500' : 'border-orange-200 dark:border-zinc-700 focus:border-orange-500'
                  }`}
                />
                <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              </div>
              {errors.fullName && <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                Nomor Telepon / WhatsApp <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="Contoh: 081234567890"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-orange-50/50 dark:bg-zinc-800 border text-sm text-stone-900 dark:text-white focus:outline-none ${
                    errors.phoneNumber ? 'border-rose-500' : 'border-orange-200 dark:border-zinc-700 focus:border-orange-500'
                  }`}
                />
                <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              </div>
              {errors.phoneNumber && <p className="text-xs text-rose-500 mt-1">{errors.phoneNumber}</p>}
            </div>
          </div>

          {/* 2. Delivery Method & Address */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-orange-100 dark:border-zinc-800 shadow-md space-y-5">
            <div className="flex items-center space-x-3 border-b border-orange-100 dark:border-zinc-800 pb-4">
              <Truck className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              <h2 className="text-xl font-bold text-stone-900 dark:text-white">
                Metode Pengiriman
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, deliveryMethod: 'diantar' })}
                className={`p-4 rounded-2xl border text-left flex items-start space-x-3 transition ${
                  formData.deliveryMethod === 'diantar'
                    ? 'border-orange-500 bg-orange-50 dark:bg-zinc-800 ring-2 ring-orange-500/20'
                    : 'border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/40'
                }`}
              >
                <Truck className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-sm block text-stone-900 dark:text-white">Diantar (+Rp 5.000)</span>
                  <span className="text-xs text-stone-500 dark:text-stone-400">Pengiriman area Semarang.</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, deliveryMethod: 'ambil-sendiri' })}
                className={`p-4 rounded-2xl border text-left flex items-start space-x-3 transition ${
                  formData.deliveryMethod === 'ambil-sendiri'
                    ? 'border-orange-500 bg-orange-50 dark:bg-zinc-800 ring-2 ring-orange-500/20'
                    : 'border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/40'
                }`}
              >
                <ShoppingBag className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-sm block text-stone-900 dark:text-white">Ambil Sendiri</span>
                  <span className="text-xs text-stone-500 dark:text-stone-400">Ambil di Warung Ibu Yulia.</span>
                </div>
              </button>
            </div>

            {formData.deliveryMethod === 'diantar' ? (
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                  Alamat Pengiriman <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    rows={3}
                    placeholder="Alamat lengkap, RT/RW, nomor rumah, atau patokan lokasi..."
                    value={formData.deliveryAddress}
                    onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-orange-50/50 dark:bg-zinc-800 border text-sm text-stone-900 dark:text-white focus:outline-none ${
                      errors.deliveryAddress ? 'border-rose-500' : 'border-orange-200 dark:border-zinc-700 focus:border-orange-500'
                    }`}
                  />
                  <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                </div>
                {errors.deliveryAddress && <p className="text-xs text-rose-500 mt-1">{errors.deliveryAddress}</p>}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300">
                <strong>Alamat Pengambilan:</strong> {STORE_CONFIG.address.fullAddress}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                Catatan Pesanan (Opsional)
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Contoh: Sambal dipisah, Indomie setengah matang..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-orange-50/50 dark:bg-zinc-800 border border-orange-200 dark:border-zinc-700 text-sm text-stone-900 dark:text-white focus:outline-none focus:border-orange-500"
                />
                <FileText className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              </div>
            </div>
          </div>

          {/* 3. Midtrans Payment Choice */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-orange-100 dark:border-zinc-800 shadow-md space-y-5">
            <div className="flex items-center space-x-3 border-b border-orange-100 dark:border-zinc-800 pb-4">
              <CreditCard className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <div>
                <h2 className="text-xl font-bold text-stone-900 dark:text-white">
                  Metode Pembayaran Online Midtrans
                </h2>
                <p className="text-xs text-stone-500">Terverifikasi otomatis 24/7</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: 'qris' })}
                className={`p-4 rounded-2xl border text-center flex flex-col items-center space-y-2 transition ${
                  formData.paymentMethod === 'qris'
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-zinc-800 ring-2 ring-emerald-500/20'
                    : 'border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/40'
                }`}
              >
                <QrCode className="w-6 h-6 text-emerald-600" />
                <span className="font-bold text-sm text-stone-900 dark:text-white">QRIS Instant</span>
                <span className="text-[11px] text-stone-500">GoPay, OVO, ShopeePay</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: 'transfer' })}
                className={`p-4 rounded-2xl border text-center flex flex-col items-center space-y-2 transition ${
                  formData.paymentMethod === 'transfer'
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-zinc-800 ring-2 ring-emerald-500/20'
                    : 'border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/40'
                }`}
              >
                <CreditCard className="w-6 h-6 text-blue-600" />
                <span className="font-bold text-sm text-stone-900 dark:text-white">Virtual Account</span>
                <span className="text-[11px] text-stone-500">BCA, Mandiri, BRI, BNI</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: 'cash' })}
                className={`p-4 rounded-2xl border text-center flex flex-col items-center space-y-2 transition ${
                  formData.paymentMethod === 'cash'
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-zinc-800 ring-2 ring-emerald-500/20'
                    : 'border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/40'
                }`}
              >
                <Banknote className="w-6 h-6 text-amber-600" />
                <span className="font-bold text-sm text-stone-900 dark:text-white">Tunai / Cash</span>
                <span className="text-[11px] text-stone-500">Bayar saat terima</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Order Summary & Midtrans Payment CTA */}
        <div className="lg:col-span-5">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-orange-100 dark:border-zinc-800 shadow-xl space-y-6 sticky top-28">
            <h2 className="text-xl font-extrabold text-stone-900 dark:text-white border-b border-orange-100 dark:border-zinc-800 pb-3">
              Rincian Tagihan
            </h2>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-orange-600 dark:text-orange-400">{item.quantity}x</span>
                    <span className="text-stone-800 dark:text-stone-200">{item.product.name}</span>
                  </div>
                  <span className="font-semibold text-stone-900 dark:text-white">
                    {formatRupiahCompact(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-orange-100 dark:border-zinc-800 pt-4 space-y-2 text-xs sm:text-sm">
              <div className="flex items-center justify-between text-stone-600 dark:text-stone-400">
                <span>Subtotal Menu</span>
                <span>{formatRupiahCompact(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-stone-600 dark:text-stone-400">
                <span>Ongkos Kirim</span>
                <span>{deliveryFee > 0 ? formatRupiahCompact(deliveryFee) : 'Gratis'}</span>
              </div>
              <div className="flex items-baseline justify-between pt-2 text-stone-900 dark:text-white border-t border-orange-100 dark:border-zinc-800">
                <span className="text-base font-extrabold">Total Bayar</span>
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  {formatRupiahCompact(grandTotal)}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 space-y-1">
              <p className="font-bold flex items-center space-x-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Pembayaran Aman via Midtrans</span>
              </p>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                Sistem secara otomatis mengonfirmasi status pembayaran dan meneruskan pesanan ke Ibu Yulia.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base shadow-xl shadow-emerald-600/30 flex items-center justify-center space-x-2 transition hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Memproses Midtrans...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  <span>Bayar Sekarang via Midtrans</span>
                </>
              )}
            </button>
          </div>
        </div>

      </form>

    </div>
  );
}
