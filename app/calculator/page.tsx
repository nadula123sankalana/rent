"use client";

import { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from "recharts";

const pieData = [
  { name: "Rent", value: 35, color: "#047857" },
  { name: "Food", value: 15, color: "#10b981" },
  { name: "Tax", value: 10, color: "#f59e0b" },
  { name: "Leftover", value: 40, color: "#0f172a" }
];

export default function CalculatorPage() {
  const [salary, setSalary] = useState(70000);

  const status = useMemo(() => {
    if (salary < 60000) {
      return {
        label: "Struggling in Seattle",
        className: "text-red-600"
      };
    }
    if (salary < 80000) {
      return {
        label: "Tight budget in Seattle",
        className: "text-amber-600"
      };
    }
    return {
      label: "Thriving in Seattle",
      className: "text-emerald-700"
    };
  }, [salary]);

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-slate-800">
          Cost of Living Calculator
        </h1>
        <p className="max-w-2xl text-slate-600">
          Drag the slider to see how your current salary stacks up against a
          typical US cost-of-living split.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-3xl border border-white/50 bg-white/70 p-8 shadow-lg shadow-slate-200/40 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Current Salary
          </p>
          <p className="mt-3 text-3xl font-semibold text-slate-800">
            ${salary.toLocaleString("en-US")}
          </p>
          <p className={`mt-2 text-sm font-semibold ${status.className}`}>
            {status.label}
          </p>

          <label
            htmlFor="salary-slider"
            className="mt-6 block text-sm font-medium text-slate-700"
          >
            Slide to adjust salary
          </label>
          <input
            id="salary-slider"
            type="range"
            min={30000}
            max={150000}
            step={1000}
            value={salary}
            onChange={(event) => setSalary(Number(event.target.value))}
            className="mt-3 w-full accent-emerald-600"
          />
          <div className="mt-2 flex justify-between text-xs text-slate-500">
            <span>$30k</span>
            <span>$150k</span>
          </div>
        </div>

        <div className="rounded-3xl border border-white/50 bg-white/70 p-8 shadow-lg shadow-slate-200/40 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Typical Monthly Split
          </p>
          <div className="mt-6 h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-600">
            {pieData.map((entry) => (
              <div key={entry.name} className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span>{entry.name}</span>
                <span className="ml-auto font-semibold">{entry.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
