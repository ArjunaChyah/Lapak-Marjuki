'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { STORE_CONFIG } from '@/lib/config';
import { ShoppingBag, Sun, Moon, Menu, X, UtensilsCrossed, ShieldCheck, User, LogOut, LogIn } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { user, role, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Tentang Kami', href: '/about' },
    { name: 'Cara Pemesanan', href: '/#cara-pemesanan' },
    { name: 'Keranjang', href: '/cart', badge: totalItems },
    { name: 'Checkout', href: '/checkout' },
    { name: 'Kontak', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return false;
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-nav border-b border-orange-200/50 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
                {STORE_CONFIG.name}
              </span>
              <span className="block text-xs font-semibold text-orange-600/80 dark:text-orange-400/80 -mt-1">
                Kuliner Rumahan Ibu Yulia
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 dark:bg-orange-600'
                      : 'text-stone-700 dark:text-stone-200 hover:bg-orange-100/60 dark:hover:bg-zinc-800/80 hover:text-orange-600 dark:hover:text-orange-400'
                  }`}
                >
                  <span className="flex items-center space-x-1">
                    <span>{link.name}</span>
                    {link.badge !== undefined && link.badge > 0 && (
                      <span className="ml-1 px-1.5 py-0.5 text-[10px] font-extrabold rounded-full bg-amber-400 text-stone-900 shadow">
                        {link.badge}
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Quick Cart Button */}
            <Link
              href="/cart"
              className="relative p-2.5 rounded-xl bg-orange-100/70 dark:bg-zinc-800 text-orange-600 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-zinc-700 transition flex items-center justify-center"
              aria-label="Keranjang Belanja"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-stone-950 font-black text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-zinc-900">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-orange-100/70 dark:bg-zinc-800 text-stone-700 dark:text-stone-200 hover:bg-orange-200 dark:hover:bg-zinc-700 transition"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-stone-700" />
              )}
            </button>

            {/* Auth Login / Role Pill */}
            {role === 'admin' ? (
              <div className="flex items-center space-x-2">
                <Link
                  href="/admin"
                  className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md flex items-center space-x-1.5 transition"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span className="hidden sm:inline">Admin Ibu Yulia</span>
                </Link>
                <button
                  onClick={logout}
                  className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 hover:bg-rose-200 transition"
                  title="Keluar / Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : role === 'client' ? (
              <div className="flex items-center space-x-2">
                <div className="px-3 py-2 rounded-xl bg-orange-100 dark:bg-zinc-800 text-stone-900 dark:text-white text-xs font-bold flex items-center space-x-1.5">
                  <User className="w-4 h-4 text-orange-600" />
                  <span className="max-w-[100px] truncate">{user?.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 rounded-xl bg-stone-100 dark:bg-zinc-800 text-stone-500 hover:text-rose-600 transition"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-1.5">
                <Link
                  href="/login"
                  className="px-3 py-2 rounded-xl bg-orange-100 dark:bg-zinc-800 text-orange-700 dark:text-orange-300 hover:bg-orange-200 text-xs font-bold transition flex items-center space-x-1"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Pelanggan</span>
                </Link>
                <Link
                  href="/admin/login"
                  className="px-3 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-extrabold shadow-md flex items-center space-x-1 transition"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin</span>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-orange-100/70 dark:bg-zinc-800 text-stone-700 dark:text-stone-200"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-orange-200/50 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-lg px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold text-stone-800 dark:text-stone-200 hover:bg-orange-100/60 dark:hover:bg-zinc-800"
            >
              <span>{link.name}</span>
              {link.badge !== undefined && link.badge > 0 && (
                <span className="px-2 py-0.5 text-xs font-black rounded-full bg-amber-400 text-stone-950">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}

          <div className="pt-3 border-t border-orange-100 dark:border-zinc-800 flex items-center justify-between px-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-bold text-stone-600 dark:text-stone-300 hover:underline"
            >
              Login Pelanggan
            </Link>
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline flex items-center space-x-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Login Admin Ibu Yulia</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
