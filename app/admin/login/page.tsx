'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { STORE_CONFIG } from '@/lib/config';
import { ShieldCheck, Lock, LogIn, ArrowLeft, KeyRound } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { loginAsAdmin, role } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = loginAsAdmin(password);
    if (success) {
      router.push('/admin');
    } else {
      setError('Kata sandi admin salah! (Default: adminmarjukis)');
    }
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

        <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 flex items-center justify-center mx-auto mb-2">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-black text-stone-900 dark:text-white">
          Login Admin Ibu Yulia
        </h1>
        <p className="text-xs text-stone-600 dark:text-stone-400">
          Masuk ke Dashboard Pengelola {STORE_CONFIG.name}.
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-orange-200 dark:border-zinc-800 shadow-xl space-y-6">
        
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-xs text-rose-600 dark:text-rose-400">
            {error}
          </div>
        )}

        <div className="p-4 rounded-xl bg-orange-50 dark:bg-zinc-800 border border-orange-200 dark:border-zinc-700 text-xs text-stone-700 dark:text-stone-300">
          <p className="font-bold flex items-center space-x-1 mb-1 text-orange-700 dark:text-orange-400">
            <KeyRound className="w-4 h-4" />
            <span>Info Kata Sandi Admin Default:</span>
          </p>
          <p>Gunakan password: <code className="bg-white dark:bg-zinc-900 px-2 py-0.5 rounded font-mono font-bold text-orange-600">adminmarjukis</code></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              Kata Sandi Admin
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="Masukkan kata sandi admin..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-orange-50/50 dark:bg-zinc-800 border border-orange-200 dark:border-zinc-700 text-sm text-stone-900 dark:text-white focus:outline-none focus:border-orange-500"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-4" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-sm shadow-lg shadow-orange-600/30 flex items-center justify-center space-x-2 transition"
          >
            <LogIn className="w-4 h-4" />
            <span>Masuk ke Dashboard Admin</span>
          </button>
        </form>

        <div className="pt-4 border-t border-orange-100 dark:border-zinc-800 text-center">
          <Link
            href="/login"
            className="text-xs text-stone-500 hover:underline"
          >
            Bukan Admin? Masuk sebagai Pelanggan
          </Link>
        </div>

      </div>

    </div>
  );
}
