 "use client";

import type { CostItem } from "@/lib/posts";

type CostTableProps = {
  costs: CostItem[];
  currency?: string;
};

const formatUsd = (value: number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);

const parsePrice = (raw: string) => {
  const normalized = raw.replace(/[^0-9.]/g, "");
  const parsed = Number.parseFloat(normalized);
  return Number.isNaN(parsed) ? 0 : parsed;
};

export default function CostTable({ costs, currency = "$" }: CostTableProps) {
  const total = costs.reduce((sum, item) => sum + parsePrice(item.price), 0);
  const copyBreakdown = async () => {
    const lines = costs.map(
      (item) =>
        `${item.category}: ${currency}${formatUsd(parsePrice(item.price))}`
    );
    lines.push(`TOTAL: ${currency}${formatUsd(total)}`);
    await navigator.clipboard.writeText(lines.join("\n"));
  };

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-2xl border border-white/40 bg-white/70 shadow-lg shadow-slate-200/40 backdrop-blur">
      <table className="min-w-full table-auto text-left">
        <thead className="bg-white/80">
          <tr>
            <th className="px-6 py-4 text-xs uppercase tracking-[0.2em] text-slate-500">
              Category
            </th>
            <th className="px-6 py-4 text-xs uppercase tracking-[0.2em] text-slate-500">
              Monthly Cost
            </th>
            <th className="px-6 py-4 text-xs uppercase tracking-[0.2em] text-slate-500">
              Notes
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {costs.map((item) => (
            <tr key={item.category}>
              <td className="px-6 py-4 text-sm font-medium text-slate-800">
                {item.category}
              </td>
              <td className="px-6 py-4 font-mono text-sm text-emerald-700">
                {currency}
                {formatUsd(parsePrice(item.price))}
              </td>
              <td className="px-6 py-4 text-sm text-slate-600">
                {item.note ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-slate-50">
          <tr>
            <td className="px-6 py-4 text-sm font-semibold text-slate-800">
              TOTAL
            </td>
            <td className="px-6 py-4 font-mono text-sm font-semibold text-emerald-700">
              {currency}
              {formatUsd(total)}
            </td>
            <td className="px-6 py-4 text-sm text-slate-500">
              <div className="flex items-center justify-between gap-4">
                <span>Estimated monthly total</span>
                <button
                  type="button"
                  onClick={copyBreakdown}
                  className="rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-medium text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-50"
                >
                  Copy Breakdown
                </button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
      </div>
      <p className="text-xs italic text-slate-400">
        Source: Zillow Jan 2026 Data &amp; Local Utility Reports.
      </p>
    </div>
  );
}
