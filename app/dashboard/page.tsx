"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import {
  Search,
  Download,
  ChevronUp,
  ChevronDown,
  Filter,
  Users,
  UserCheck,
  BarChart3,
  Clock,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  X,
} from "lucide-react";

interface Lead {
  id: string;
  url: string;
  businessName: string;
  sector: string;
  location: string;
  phone?: string;
  email?: string;
  legacyScore: number;
  legacySignals: string[];
  isOperational: boolean;
  scrapedAt: string;
  qualified: boolean;
}

interface PipelineStats {
  totalLeads: number;
  qualifiedLeads: number;
  bySector: Record<string, number>;
  byLocation: Record<string, number>;
  avgLegacyScore: number;
  lastRunAt: string | null;
}

type SortField = "businessName" | "sector" | "location" | "legacyScore" | "scrapedAt";
type SortDir = "asc" | "desc";

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

function ScoreBar({ score }: { score: number }) {
  const color =
    score >= 60
      ? "bg-emerald-500"
      : score >= 30
        ? "bg-amber-500"
        : "bg-red-400";
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-xs tabular-nums text-muted">{score}</span>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  accent?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5 flex flex-col gap-2 glow-border transition-shadow">
      <div className="flex items-center gap-2 text-muted text-sm">
        <Icon size={16} className={accent ?? "text-accent-light"} />
        {label}
      </div>
      <div className="text-2xl font-semibold tracking-tight">{value}</div>
    </div>
  );
}

function SectorBreakdown({ data }: { data: Record<string, number> }) {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const max = entries[0]?.[1] ?? 1;

  return (
    <div className="rounded-xl border border-border bg-surface p-5 glow-border transition-shadow">
      <h3 className="text-sm font-medium text-muted mb-4">Leads by Sector</h3>
      <div className="space-y-3">
        {entries.map(([sector, count]) => (
          <div key={sector}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-foreground/80 capitalize truncate max-w-[70%]">
                {sector}
              </span>
              <span className="text-muted tabular-nums">{count}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent to-accent-light transition-all duration-500"
                style={{ width: `${(count / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LocationBreakdown({ data }: { data: Record<string, number> }) {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const max = entries[0]?.[1] ?? 1;

  return (
    <div className="rounded-xl border border-border bg-surface p-5 glow-border transition-shadow">
      <h3 className="text-sm font-medium text-muted mb-4">Leads by Location</h3>
      <div className="space-y-3">
        {entries.map(([loc, count]) => (
          <div key={loc}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-foreground/80 truncate max-w-[70%]">
                {loc}
              </span>
              <span className="text-muted tabular-nums">{count}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-400 transition-all duration-500"
                style={{ width: `${(count / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<PipelineStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [qualifiedOnly, setQualifiedOnly] = useState(false);
  const [sortField, setSortField] = useState<SortField>("legacyScore");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [leadsRes, statsRes] = await Promise.all([
        fetchJSON<{ data: Lead[] }>("/api/leadgen/leads?limit=500"),
        fetchJSON<PipelineStats>("/api/leadgen/stats"),
      ]);
      setLeads(leadsRes.data);
      setStats(statsRes);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Failed to load data",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const sectors = useMemo(
    () => [...new Set(leads.map((l) => l.sector))].sort(),
    [leads],
  );
  const locations = useMemo(
    () => [...new Set(leads.map((l) => l.location))].sort(),
    [leads],
  );

  const filtered = useMemo(() => {
    let result = leads;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (l) =>
          l.businessName.toLowerCase().includes(q) ||
          l.url.toLowerCase().includes(q) ||
          l.sector.toLowerCase().includes(q) ||
          l.location.toLowerCase().includes(q),
      );
    }
    if (sectorFilter) result = result.filter((l) => l.sector === sectorFilter);
    if (locationFilter)
      result = result.filter((l) => l.location === locationFilter);
    if (qualifiedOnly) result = result.filter((l) => l.qualified);

    result = [...result].sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case "businessName":
          cmp = a.businessName.localeCompare(b.businessName);
          break;
        case "sector":
          cmp = a.sector.localeCompare(b.sector);
          break;
        case "location":
          cmp = a.location.localeCompare(b.location);
          break;
        case "legacyScore":
          cmp = a.legacyScore - b.legacyScore;
          break;
        case "scrapedAt":
          cmp = a.scrapedAt.localeCompare(b.scrapedAt);
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return result;
  }, [leads, search, sectorFilter, locationFilter, qualifiedOnly, sortField, sortDir]);

  function toggleSort(field: SortField) {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir(field === "businessName" ? "asc" : "desc");
    }
  }

  function SortIcon({ field }: { field: SortField }) {
    if (sortField !== field)
      return <ChevronDown size={12} className="text-white/20" />;
    return sortDir === "asc" ? (
      <ChevronUp size={12} className="text-accent-light" />
    ) : (
      <ChevronDown size={12} className="text-accent-light" />
    );
  }

  const hasFilters = search || sectorFilter || locationFilter || qualifiedOnly;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Leads Dashboard
            </h1>
            <p className="text-xs text-muted mt-0.5">
              MorphicStack Lead Generation Pipeline
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="text-xs text-muted hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border border-border hover:border-accent/30"
            >
              Refresh
            </button>
            <a
              href="/api/leadgen/leads/export"
              className="flex items-center gap-1.5 text-xs bg-accent/20 text-accent-light hover:bg-accent/30 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Download size={13} />
              Export CSV
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto px-6 py-6 space-y-6">
        {error && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-300">
            {error} — Make sure the leadgen API is running on port 3200.
          </div>
        )}

        {/* Stats cards */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Total Leads"
              value={stats.totalLeads}
              icon={Users}
            />
            <StatCard
              label="Qualified"
              value={stats.qualifiedLeads}
              icon={UserCheck}
              accent="text-emerald-400"
            />
            <StatCard
              label="Avg Legacy Score"
              value={stats.avgLegacyScore}
              icon={BarChart3}
              accent="text-amber-400"
            />
            <StatCard
              label="Last Scraped"
              value={
                stats.lastRunAt
                  ? new Date(stats.lastRunAt).toLocaleDateString()
                  : "Never"
              }
              icon={Clock}
              accent="text-cyan-400"
            />
          </div>
        )}

        {/* Breakdowns */}
        {stats && (Object.keys(stats.bySector).length > 0 || Object.keys(stats.byLocation).length > 0) && (
          <div className="grid lg:grid-cols-2 gap-4">
            {Object.keys(stats.bySector).length > 0 && (
              <SectorBreakdown data={stats.bySector} />
            )}
            {Object.keys(stats.byLocation).length > 0 && (
              <LocationBreakdown data={stats.byLocation} />
            )}
          </div>
        )}

        {/* Filters */}
        <div className="rounded-xl border border-border bg-surface p-4 glow-border">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                type="text"
                placeholder="Search leads..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-surface-light border border-border rounded-lg pl-9 pr-3 py-2 text-sm placeholder:text-muted/60 focus:outline-none focus:border-accent/40 transition-colors"
              />
            </div>

            <div className="flex items-center gap-1.5 text-muted text-xs">
              <Filter size={13} />
            </div>

            <select
              value={sectorFilter}
              onChange={(e) => setSectorFilter(e.target.value)}
              className="bg-surface-light border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-accent/40 transition-colors appearance-none cursor-pointer"
            >
              <option value="">All Sectors</option>
              {sectors.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="bg-surface-light border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-accent/40 transition-colors appearance-none cursor-pointer"
            >
              <option value="">All Locations</option>
              {locations.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>

            <button
              onClick={() => setQualifiedOnly((v) => !v)}
              className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                qualifiedOnly
                  ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-300"
                  : "bg-surface-light border-border text-muted hover:text-foreground"
              }`}
            >
              Qualified only
            </button>

            {hasFilters && (
              <button
                onClick={() => {
                  setSearch("");
                  setSectorFilter("");
                  setLocationFilter("");
                  setQualifiedOnly(false);
                }}
                className="flex items-center gap-1 px-2 py-2 text-xs text-muted hover:text-foreground transition-colors"
              >
                <X size={13} />
                Clear
              </button>
            )}
          </div>

          <div className="mt-2 text-xs text-muted">
            {filtered.length} lead{filtered.length !== 1 ? "s" : ""}
            {hasFilters ? " (filtered)" : ""}
          </div>
        </div>

        {/* Leads table */}
        <div className="rounded-xl border border-border bg-surface overflow-hidden glow-border">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-muted text-sm">
              Loading leads...
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex items-center justify-center py-20 text-muted text-sm">
              {hasFilters ? "No leads match your filters." : "No leads found."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs text-muted">
                    <th className="px-4 py-3 font-medium">
                      <button
                        className="flex items-center gap-1 hover:text-foreground transition-colors"
                        onClick={() => toggleSort("businessName")}
                      >
                        Business <SortIcon field="businessName" />
                      </button>
                    </th>
                    <th className="px-4 py-3 font-medium">
                      <button
                        className="flex items-center gap-1 hover:text-foreground transition-colors"
                        onClick={() => toggleSort("sector")}
                      >
                        Sector <SortIcon field="sector" />
                      </button>
                    </th>
                    <th className="px-4 py-3 font-medium">
                      <button
                        className="flex items-center gap-1 hover:text-foreground transition-colors"
                        onClick={() => toggleSort("location")}
                      >
                        Location <SortIcon field="location" />
                      </button>
                    </th>
                    <th className="px-4 py-3 font-medium">
                      <button
                        className="flex items-center gap-1 hover:text-foreground transition-colors"
                        onClick={() => toggleSort("legacyScore")}
                      >
                        Legacy Score <SortIcon field="legacyScore" />
                      </button>
                    </th>
                    <th className="px-4 py-3 font-medium">Contact</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">
                      <button
                        className="flex items-center gap-1 hover:text-foreground transition-colors"
                        onClick={() => toggleSort("scrapedAt")}
                      >
                        Scraped <SortIcon field="scrapedAt" />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-b border-border/50 hover:bg-surface-light/50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground truncate max-w-[200px]">
                            {lead.businessName}
                          </span>
                          <a
                            href={lead.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted hover:text-accent-light transition-colors shrink-0"
                          >
                            <ExternalLink size={12} />
                          </a>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-2 py-0.5 rounded-md bg-accent/10 text-accent-light text-xs capitalize">
                          {lead.sector}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1 text-muted text-xs">
                          <MapPin size={11} />
                          {lead.location}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <ScoreBar score={lead.legacyScore} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {lead.phone && (
                            <a
                              href={`tel:${lead.phone}`}
                              className="text-muted hover:text-foreground transition-colors"
                              title={lead.phone}
                            >
                              <Phone size={12} />
                            </a>
                          )}
                          {lead.email && (
                            <a
                              href={`mailto:${lead.email}`}
                              className="text-muted hover:text-foreground transition-colors"
                              title={lead.email}
                            >
                              <Mail size={12} />
                            </a>
                          )}
                          {!lead.phone && !lead.email && (
                            <span className="text-muted/40 text-xs">—</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {lead.qualified ? (
                          <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 text-xs">
                            Qualified
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-0.5 rounded-md bg-white/5 text-muted text-xs">
                            Unqualified
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs text-muted tabular-nums">
                        {new Date(lead.scrapedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
