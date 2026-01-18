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

  return (
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
              Estimated monthly total
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
