
"use client";

import { useState } from "react";

const stats = [
  {
    label: "Total revenue",
    value: "$124,580",
    change: "+12.8%",
    detail: "Compared to last month",
    icon: "$",
  },
  {
    label: "Net profit",
    value: "$38,240",
    change: "+8.4%",
    detail: "Compared to last month",
    icon: "↗",
  },
  {
    label: "Operating costs",
    value: "$56,890",
    change: "-3.2%",
    detail: "Lower is better",
    icon: "−",
  },
  {
    label: "Profit margin",
    value: "30.7%",
    change: "+2.6%",
    detail: "Compared to last month",
    icon: "%",
  },
];

const revenueData = [
  { month: "May", revenue: 38, expenses: 25 },
  { month: "Jun", revenue: 48, expenses: 29 },
  { month: "Jul", revenue: 42, expenses: 27 },
  { month: "Aug", revenue: 62, expenses: 35 },
  { month: "Sep", revenue: 55, expenses: 32 },
  { month: "Oct", revenue: 78, expenses: 41 },
  { month: "Nov", revenue: 69, expenses: 38 },
  { month: "Dec", revenue: 91, expenses: 47 },
];

const transactions = [
  {
    name: "Website development",
    category: "Services",
    date: "Oct 14, 2026",
    amount: "+$8,400",
    type: "income",
  },
  {
    name: "Marketing campaign",
    category: "Marketing",
    date: "Oct 13, 2026",
    amount: "-$1,250",
    type: "expense",
  },
  {
    name: "Monthly subscription",
    category: "Recurring revenue",
    date: "Oct 12, 2026",
    amount: "+$2,890",
    type: "income",
  },
  {
    name: "Cloud infrastructure",
    category: "Technology",
    date: "Oct 11, 2026",
    amount: "-$640",
    type: "expense",
  },
];

function Icon({
  name,
  size = 20,
}: {
  name: string;
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "grid":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common}>
          <path d="M3 3v18h18" />
          <path d="m7 14 4-4 4 3 6-7" />
        </svg>
      );
    case "wallet":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="15" rx="2" />
          <path d="M3 9h18" />
          <path d="M16 14h2" />
          <path d="M6 5V3h12" />
        </svg>
      );
    case "brain":
      return (
        <svg {...common}>
          <path d="M12 4a4 4 0 0 0-7 3 4 4 0 0 0-1 7 4 4 0 0 0 4 6h4Z" />
          <path d="M12 4a4 4 0 0 1 7 3 4 4 0 0 1 1 7 4 4 0 0 1-4 6h-4Z" />
          <path d="M8 8c2 0 3 2 3 4" />
          <path d="M16 8c-2 0-3 2-3 4" />
          <path d="M7 15c2 0 3 1 4 3" />
          <path d="M17 15c-2 0-3 1-4 3" />
        </svg>
      );
    case "settings":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.8 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.8-1l-1.7.7-1.4-2.4L7.9 15a8 8 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.8-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.8 1l1.7-.7 1.4 2.4-1.4 1.1a8 8 0 0 1 0 2Z" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="10.8" cy="10.8" r="6.8" />
          <path d="m16 16 5 5" />
        </svg>
      );
    case "bell":
      return (
        <svg {...common}>
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
          <path d="M10 21h4" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common}>
          <path d="M7 17 17 7" />
          <path d="M7 7h10v10" />
        </svg>
      );
    case "download":
      return (
        <svg {...common}>
          <path d="M12 3v12" />
          <path d="m7 10 5 5 5-5" />
          <path d="M5 19h14" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      );
  }
}

function RevenueChart() {
  const width = 700;
  const height = 235;
  const left = 42;
  const right = 12;
  const top = 14;
  const bottom = 30;
  const chartWidth = width - left - right;
  const chartHeight = height - top - bottom;

  const point = (value: number, index: number) => {
    const x = left + (index / (revenueData.length - 1)) * chartWidth;
    const y = top + chartHeight - (value / 100) * chartHeight;
    return `${x},${y}`;
  };

  const revenuePoints = revenueData
    .map((item, index) => point(item.revenue, index))
    .join(" ");

  const expensePoints = revenueData
    .map((item, index) => point(item.expenses, index))
    .join(" ");

  const first = `${left},${top + chartHeight}`;
  const last = `${left + chartWidth},${top + chartHeight}`;
  const areaPoints = `${first} ${revenuePoints} ${last}`;

  return (
    <div className="w-full overflow-hidden">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full"
        role="img"
        aria-label="Illustrative monthly revenue and expenses chart"
      >
        <defs>
          <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 25, 50, 75, 100].map((value) => {
          const y = top + chartHeight - (value / 100) * chartHeight;
          return (
            <g key={value}>
              <line
                x1={left}
                y1={y}
                x2={width - right}
                y2={y}
                stroke="#263548"
                strokeDasharray="4 5"
              />
              <text
                x="3"
                y={y + 4}
                fill="#75849a"
                fontSize="11"
              >
                {value}k
              </text>
            </g>
          );
        })}

        <polygon points={areaPoints} fill="url(#revenueFill)" />

        <polyline
          points={expensePoints}
          fill="none"
          stroke="#818cf8"
          strokeWidth="2.5"
          strokeDasharray="5 6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <polyline
          points={revenuePoints}
          fill="none"
          stroke="#22d3ee"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {revenueData.map((item, index) => {
          const [x, y] = point(item.revenue, index).split(",");
          return (
            <g key={item.month}>
              <circle
                cx={x}
                cy={y}
                r="4"
                fill="#0b1423"
                stroke="#22d3ee"
                strokeWidth="2"
              />
              <text
                x={Number(x)}
                y={height - 5}
                textAnchor="middle"
                fill="#8795a9"
                fontSize="11"
              >
                {item.month}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function Home() {
  const [activePage, setActivePage] = useState("Overview");
  const [question, setQuestion] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState("Last 8 months");

  async function askAI() {
    if (!question.trim()) {
      setAnalysis("Please enter a business question first.");
      return;
    }

    setLoading(true);
    setAnalysis("");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          data: {
            rows: 6,
            revenue: 120000,
            expenses: 71000,
            profit: 49000,
            margin: 40.8,
            columns: ["Month", "Revenue", "Expenses", "Profit"],
            monthlySummary: revenueData,
            sampleRows: [
              { month: "August", revenue: 62000, expenses: 35000 },
              { month: "September", revenue: 55000, expenses: 32000 },
              { month: "October", revenue: 78000, expenses: 41000 },
            ],
          },
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "AI analysis could not be completed."
        );
      }

      setAnalysis(
        result.analysis ||
          result.result ||
          result.text ||
          JSON.stringify(result, null, 2)
      );
    } catch (error) {
      setAnalysis(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const navigation = [
    { label: "Overview", icon: "grid" },
    { label: "Analytics", icon: "chart" },
    { label: "Finances", icon: "wallet" },
    { label: "AI Analyst", icon: "brain" },
  ];

  return (
    <main className="min-h-screen bg-[#080e19] text-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-[245px] shrink-0 flex-col border-r border-white/[0.07] bg-[#0a1220] px-5 py-7 lg:flex">
          <div className="mb-12 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 text-lg font-black text-slate-950">
              B
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">
                BizPilot<span className="text-cyan-400"> AI</span>
              </h1>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                Business intelligence
              </p>
            </div>
          </div>

          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Workspace
          </p>

          <nav className="space-y-1">
            {navigation.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setActivePage(item.label);
                  if (item.label === "AI Analyst") {
                    document
                      .getElementById("ai-analyst")
                      ?.scrollIntoView({ behavior: "smooth" });
                  } else if (item.label === "Analytics") {
                    document
                      .getElementById("analytics")
                      ?.scrollIntoView({ behavior: "smooth" });
                  } else if (item.label === "Finances") {
                    document
                      .getElementById("transactions")
                      ?.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
                  activePage === item.label
                    ? "bg-cyan-400/10 font-medium text-cyan-300"
                    : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <Icon name={item.icon} size={18} />
                {item.label}
                {item.label === "AI Analyst" && (
                  <span className="ml-auto rounded-md bg-indigo-400/15 px-1.5 py-0.5 text-[9px] text-indigo-300">
                    AI
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="mt-10 border-t border-white/[0.07] pt-6">
            <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Preferences
            </p>
            <button
              onClick={() => setAnalysis("Settings are not connected yet.")}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
            >
              <Icon name="settings" size={18} />
              Settings
            </button>
          </div>

          <div className="mt-auto rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-medium text-slate-300">
                Workspace status
              </span>
            </div>
            <p className="text-xs leading-5 text-slate-500">
              Your business overview is ready. Connect your data to personalize
              your insights.
            </p>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-10 flex h-[76px] items-center justify-between border-b border-white/[0.07] bg-[#080e19]/95 px-5 backdrop-blur-xl sm:px-8 xl:px-10">
            <div>
              <p className="text-xs text-slate-500">Workspace / Dashboard</p>
              <p className="mt-1 text-sm font-medium text-slate-200">
                Business overview
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-xs text-slate-400 sm:flex">
                <Icon name="search" size={15} />
                <span>Search workspace</span>
                <span className="ml-4 rounded border border-white/10 px-1.5 py-0.5 text-[10px]">
                  /
                </span>
              </div>
              <button
                aria-label="Notifications"
                className="relative rounded-xl border border-white/[0.08] p-2.5 text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
              >
                <Icon name="bell" size={18} />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-400" />
              </button>
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-xs font-semibold text-cyan-200">
                BP
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1500px] space-y-8 px-5 py-8 sm:px-8 xl:px-10">
            <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] px-3 py-1.5 text-[11px] font-medium text-cyan-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  BUSINESS INTELLIGENCE
                </div>
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  See your business
                  <br className="hidden sm:block" /> more clearly.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                  One workspace for your financial performance, growth
                  opportunities and AI-powered business decisions.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={period}
                  onChange={(event) => setPeriod(event.target.value)}
                  className="rounded-xl border border-white/10 bg-[#101a2a] px-3 py-2.5 text-xs text-slate-300 outline-none focus:border-cyan-400/50"
                >
                  <option>Last 8 months</option>
                  <option>This year</option>
                  <option>Last 30 days</option>
                </select>
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-2.5 text-xs font-medium text-slate-200 transition hover:bg-white/[0.07]"
                >
                  <Icon name="download" size={15} />
                  Export view
                </button>
              </div>
            </section>

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat, index) => (
                <article
                  key={stat.label}
                  className="rounded-2xl border border-white/[0.08] bg-[#0d1625] p-5 transition duration-200 hover:border-cyan-300/20"
                >
                  <div className="flex items-start justify-between">
                    <p className="text-sm text-slate-400">{stat.label}</p>
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-semibold ${
                        index === 0
                          ? "bg-cyan-300/10 text-cyan-300"
                          : index === 1
                            ? "bg-emerald-300/10 text-emerald-300"
                            : index === 2
                              ? "bg-amber-300/10 text-amber-300"
                              : "bg-indigo-300/10 text-indigo-300"
                      }`}
                    >
                      {stat.icon}
                    </span>
                  </div>
                  <p className="mt-5 text-2xl font-semibold tracking-tight text-white sm:text-[28px]">
                    {stat.value}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-md px-1.5 py-1 text-[10px] font-semibold ${
                        stat.label === "Operating costs"
                          ? "bg-emerald-400/10 text-emerald-300"
                          : "bg-emerald-400/10 text-emerald-300"
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {stat.detail}
                    </span>
                  </div>
                </article>
              ))}
            </section>

            <section
              id="analytics"
              className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.8fr)_minmax(280px,0.85fr)]"
            >
              <article className="min-w-0 rounded-2xl border border-white/[0.08] bg-[#0d1625] p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      Revenue performance
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-500">
                      Illustrative revenue and expense trends
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-cyan-400" />
                      Revenue
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-indigo-400" />
                      Expenses
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <RevenueChart />
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-4">
                  <p className="text-xs text-slate-500">{period}</p>
                  <p className="text-xs text-slate-400">
                    Demo chart · sample data
                  </p>
                </div>
              </article>

              <article className="rounded-2xl border border-white/[0.08] bg-[#0d1625] p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      Business health
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-500">
                      Sample performance indicators
                    </p>
                  </div>
                  <span className="rounded-lg border border-white/[0.08] px-2 py-1 text-[10px] text-slate-400">
                    DEMO
                  </span>
                </div>

                <div className="mt-7 flex items-center gap-5">
                  <div className="relative flex h-[112px] w-[112px] shrink-0 items-center justify-center rounded-full border-[9px] border-[#1c2b3d]">
                    <div className="absolute inset-[-9px] rounded-full border-[9px] border-transparent border-t-cyan-400 border-r-cyan-400 border-b-cyan-400 -rotate-12" />
                    <div className="text-center">
                      <p className="text-2xl font-semibold text-white">78</p>
                      <p className="text-[9px] uppercase tracking-wider text-slate-500">
                        out of 100
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-200">
                      Healthy performance
                    </p>
                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      This sample score illustrates how business indicators
                      could be presented.
                    </p>
                  </div>
                </div>

                <div className="mt-7 space-y-5">
                  {[
                    { label: "Revenue growth", value: 76, color: "bg-cyan-400" },
                    { label: "Cost control", value: 84, color: "bg-indigo-400" },
                    { label: "Profitability", value: 68, color: "bg-emerald-400" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="mb-2 flex items-center justify-between text-xs">
                        <span className="text-slate-400">{item.label}</span>
                        <span className="font-medium text-slate-300">
                          {item.value}%
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className={`h-full rounded-full ${item.color}`}
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </section>

            <section
              id="ai-analyst"
              className="overflow-hidden rounded-2xl border border-cyan-300/15 bg-[#0d1625]"
            >
              <div className="grid grid-cols-1 xl:grid-cols-[0.8fr_1.2fr]">
                <div className="border-b border-white/[0.07] p-6 sm:p-8 xl:border-b-0 xl:border-r">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-300">
                    <Icon name="brain" size={22} />
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                    BizPilot intelligence
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                    Ask your business
                    <br /> a better question.
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
                    Explore your numbers, identify potential risks and turn
                    business data into actionable recommendations.
                  </p>

                  <div className="mt-6 space-y-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                      Try asking
                    </p>
                    {[
                      "How can I improve my profit margin?",
                      "Where could I reduce expenses?",
                      "Summarize my financial performance.",
                    ].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setQuestion(suggestion)}
                        className="block w-full rounded-lg border border-white/[0.07] px-3 py-2.5 text-left text-xs text-slate-400 transition hover:border-cyan-300/25 hover:bg-cyan-300/[0.04] hover:text-cyan-200"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <label
                    htmlFor="business-question"
                    className="mb-3 block text-sm font-medium text-slate-200"
                  >
                    Your business question
                  </label>
                  <textarea
                    id="business-question"
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                    placeholder="For example: Analyze my financial performance and suggest three ways to improve profitability..."
                    rows={5}
                    className="w-full resize-y rounded-xl border border-white/10 bg-[#080e19] p-4 text-sm leading-6 text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/40"
                  />

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-[10px] text-slate-500">
                      Uses your configured AI analysis API and sample data.
                    </p>
                    <button
                      onClick={askAI}
                      disabled={loading}
                      className="flex items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 text-xs font-semibold text-[#07111d] transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loading ? "Analyzing..." : "Generate insights"}
                      {!loading && <Icon name="arrow" size={15} />}
                    </button>
                  </div>

                  {analysis && (
                    <div className="mt-6 rounded-xl border border-cyan-300/15 bg-cyan-300/[0.04] p-5">
                      <div className="mb-3 flex items-center gap-2">
                        <Icon name="brain" size={17} />
                        <p className="text-sm font-semibold text-cyan-200">
                          AI Analyst response
                        </p>
                      </div>
                      <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-7 text-slate-300">
                        {analysis}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </section>

            <section
              id="transactions"
              className="rounded-2xl border border-white/[0.08] bg-[#0d1625]"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-5 py-5 sm:px-6">
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Recent transactions
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Example records for the dashboard preview
                  </p>
                </div>
                <button
                  onClick={() => setAnalysis("Transaction data is currently illustrative demo data. Connect your own dataset to view real records.")}
                  className="flex items-center gap-1.5 text-xs font-medium text-cyan-300 transition hover:text-cyan-200"
                >
                  View details <Icon name="arrow" size={14} />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[570px] text-left">
                  <thead>
                    <tr className="border-b border-white/[0.06] text-[10px] uppercase tracking-wider text-slate-500">
                      <th className="px-6 py-4 font-medium">Transaction</th>
                      <th className="px-6 py-4 font-medium">Category</th>
                      <th className="px-6 py-4 font-medium">Date</th>
                      <th className="px-6 py-4 text-right font-medium">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr
                        key={transaction.name}
                        className="border-b border-white/[0.04] last:border-0 transition hover:bg-white/[0.02]"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm ${
                                transaction.type === "income"
                                  ? "bg-emerald-400/10 text-emerald-300"
                                  : "bg-amber-400/10 text-amber-300"
                              }`}
                            >
                              {transaction.type === "income" ? "↙" : "↗"}
                            </div>
                            <span className="text-xs font-medium text-slate-200">
                              {transaction.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-400">
                          {transaction.category}
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-500">
                          {transaction.date}
                        </td>
                        <td
                          className={`px-6 py-4 text-right text-xs font-semibold ${
                            transaction.type === "income"
                              ? "text-emerald-300"
                              : "text-slate-300"
                          }`}
                        >
                          {transaction.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <footer className="flex flex-col justify-between gap-2 border-t border-white/[0.06] py-5 text-[10px] text-slate-600 sm:flex-row">
              <p>BizPilot AI · Business intelligence workspace</p>
              <p>Demo dashboard · Illustrative figures, not live financial data</p>
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}
