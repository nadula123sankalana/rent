import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/60 bg-white/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <p className="font-medium text-slate-700">
          © 2026 The Modern Ledger. All rights reserved.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link className="hover:text-emerald-700" href="/about">
            About
          </Link>
          <Link className="hover:text-emerald-700" href="/contact">
            Contact
          </Link>
          <Link className="hover:text-emerald-700" href="/privacy">
            Privacy Policy (CCPA Compliance)
          </Link>
          <Link className="hover:text-emerald-700" href="/terms">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
