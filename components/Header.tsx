"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-sm border-b border-slate-200/60" 
          : "bg-transparent border-b border-white/20"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link 
          href="/" 
          className={`text-lg font-semibold transition-colors ${
            isScrolled ? "text-slate-800" : "text-white"
          }`}
        >
          🇺🇸 US Cost DB
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link 
            className={`transition-colors ${
              isScrolled 
                ? "text-slate-600 hover:text-emerald-700" 
                : "text-white/90 hover:text-white"
            }`} 
            href="/"
          >
            Home
          </Link>
          <Link 
            className={`transition-colors ${
              isScrolled 
                ? "text-slate-600 hover:text-emerald-700" 
                : "text-white/90 hover:text-white"
            }`} 
            href="/cities"
          >
            Cities
          </Link>
          <Link 
            className={`transition-colors ${
              isScrolled 
                ? "text-slate-600 hover:text-emerald-700" 
                : "text-white/90 hover:text-white"
            }`} 
            href="/calculator"
          >
            Calculator
          </Link>
        </nav>
      </div>
    </header>
  );
}
