'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { STORE_CONFIG } from '@/lib/config';
import { User, Mail, Lock, LogIn, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function ClientLoginPage() {
  const router = useRouter();
  const { loginAsClient, user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Masukkan alamat email yang valid.');
      return;
    }
    if (!name.trim()) {
      setError('Masukkan nama Anda.');
      return;
    }

    loginAsClient(email, name);
    router.push('/');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      
      <div className="text-center space-y-2">
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>

        <span className="text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950 px-3 py-1 rounded-full block w-max mx-auto">
          Area Pelanggan
        </span>
        <h1 className="text-3xl font-black text-stone-900 dark:text-white">
          Masuk Akun Pelanggan
        </h1>
        <p className="text-xs text-stone-600 dark:text-stone-400">
          Masuk untuk mempermudah isi data pengiriman pesanan di {STORE_CONFIG.name}.
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-orange-100 dark:border-zinc-800 shadow-xl space-y-6">
        
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-xs text-rose-600 dark:text-rose-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              Nama Lengkap
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Contoh: Budi Santoso"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-orange-50/50 dark:bg-zinc-800 border border-orange-200 dark:border-zinc-700 text-sm text-stone-900 dark:text-white focus:outline-none focus:border-orange-500"
              />
              <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              Alamat Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="budi@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-orange-50/50 dark:bg-zinc-800 border border-orange-200 dark:border-zinc-700 text-sm text-stone-900 dark:text-white focus:outline-none focus:border-orange-500"
              />
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              Kata Sandi
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-orange-50/50 dark:bg-zinc-800 border border-orange-200 dark:border-zinc-700 text-sm text-stone-900 dark:text-white focus:outline-none focus:border-orange-500"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-lg shadow-orange-600/30 flex items-center justify-center space-x-2 transition"
          >
            <LogIn className="w-4 h-4" />
            <span>Masuk Akun Pelanggan</span>
          </button>
        </form>

        <div className="pt-4 border-t border-orange-100 dark:border-zinc-800 text-center">
          <p className="text-xs text-stone-500">
            Apakah Anda Ibu Yulia / Pengelola Warung?
          </p>
          <Link
            href="/admin/login"
            className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline mt-1 inline-flex items-center space-x-1"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Login Khusus Admin / Pemilik</span>
          </Link>
        </div>

      </div>

    </div>
  );
}
