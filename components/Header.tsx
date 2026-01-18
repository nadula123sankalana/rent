import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-white/60 bg-white/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold text-slate-800">
          🇺🇸 US Cost DB
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link className="hover:text-emerald-700" href="/">
            Home
          </Link>
          <Link className="hover:text-emerald-700" href="/cities">
            Cities
          </Link>
          <Link className="hover:text-emerald-700" href="/calculator">
            Calculator
          </Link>
        </nav>
      </div>
    </header>
  );
}
