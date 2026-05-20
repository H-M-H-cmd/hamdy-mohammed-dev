"use client";

import { DATA } from "@/data/resume";
import type { ContributionsResponse } from "@/lib/github";
import Link from "next/link";
import { ArrowUpRight, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

type State = {
  status: "idle" | "loading" | "ready" | "error";
  contributions: ContributionsResponse | null;
  fetchedAt: number | null;
};

export default function GithubMosaic() {
  const [state, setState] = useState<State>({
    status: "idle",
    contributions: null,
    fetchedAt: null,
  });

  const load = useCallback(async () => {
    setState((s) => ({ ...s, status: "loading" }));
    try {
      const res = await fetch("/api/github/contributions", {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("contributions api " + res.status);
      const json = (await res.json()) as ContributionsResponse;
      setState({
        status: "ready",
        contributions: json,
        fetchedAt: Date.now(),
      });
    } catch {
      setState((s) => ({ ...s, status: "error" }));
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const loading = state.status === "loading" || state.status === "idle";
  const errored = state.status === "error";

  const totalContribs = state.contributions
    ? Object.values(state.contributions.total).reduce((a, b) => a + b, 0)
    : null;

  const days = state.contributions?.contributions ?? [];
  const weeks = useMemo(() => groupIntoWeeks(days), [days]);
  const cell = 11;
  const gap = 3;
  const svgW = Math.max(weeks.length, 53) * (cell + gap);
  const svgH = 7 * (cell + gap);
  const monthLabels = useMemo(() => buildMonthLabels(weeks), [weeks]);

  return (
    <section id="github" className="flex min-h-0 flex-col gap-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight">Live from GitHub</h2>
            <LiveDot status={state.status} />
          </div>
          <p className="text-sm text-muted-foreground">
            fetched on page load from{" "}
            <Link
              href={`https://github.com/${DATA.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-muted-foreground/40 hover:decoration-foreground"
            >
              @{DATA.githubUsername}
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={load}
            disabled={loading}
            className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-medium hover:bg-accent/50 disabled:opacity-50"
            aria-label="Refresh"
          >
            <RefreshCw
              className={"size-3 " + (loading ? "animate-spin" : "")}
            />
            refresh
          </button>
          <Link
            href={`https://github.com/${DATA.githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium hover:bg-accent/50"
          >
            View <ArrowUpRight className="size-3" />
          </Link>
        </div>
      </div>

      {errored && (
        <div className="rounded-xl border border-border bg-card/50 p-6 text-center text-sm text-muted-foreground">
          couldn&apos;t reach GitHub right now — check your network or hit refresh
        </div>
      )}

      <div className="rounded-2xl border border-border bg-card/50 p-4">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-y-1 text-xs text-muted-foreground">
          <span className="font-mono flex items-center gap-2">
            {totalContribs !== null
              ? `${totalContribs.toLocaleString()} contributions in the last year`
              : loading
              ? "loading contributions…"
              : "contributions unavailable"}
            <span
              title="Authenticated via GitHub GraphQL — counts activity across public and private repositories."
              className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-1.5 py-0.5 text-[10px] font-normal text-muted-foreground"
            >
              <span className="size-1.5 rounded-full bg-emerald-500" />
              incl. private
            </span>
          </span>
          <Legend />
        </div>
        <div className="overflow-x-auto">
          <svg
            viewBox={`0 0 ${svgW} ${svgH + 14}`}
            width="100%"
            preserveAspectRatio="xMinYMin meet"
            role="img"
            aria-label="GitHub contribution graph"
            className="block"
          >
            <g transform={`translate(0, 12)`}>
              {(weeks.length > 0 ? weeks : skeletonWeeks()).map((week, wi) => (
                <g key={wi} transform={`translate(${wi * (cell + gap)}, 0)`}>
                  {week.map((day, di) => (
                    <rect
                      key={(day && "date" in day ? day.date : "") + `${wi}-${di}`}
                      x={0}
                      y={di * (cell + gap)}
                      width={cell}
                      height={cell}
                      rx={2}
                      ry={2}
                      className={cn(
                        levelClass(day?.level ?? 0),
                        loading && "animate-pulse",
                      )}
                    >
                      {day && "date" in day && day.date && (
                        <title>
                          {day.count} contribution{day.count === 1 ? "" : "s"} on{" "}
                          {day.date}
                        </title>
                      )}
                    </rect>
                  ))}
                </g>
              ))}
            </g>
            <g fill="currentColor" className="text-muted-foreground">
              {monthLabels.map((m) => (
                <text
                  key={`${m.label}-${m.x}`}
                  x={m.x}
                  y={10}
                  fontSize="9"
                  fontFamily="ui-monospace, SFMono-Regular, monospace"
                >
                  {m.label}
                </text>
              ))}
            </g>
          </svg>
        </div>
        {state.fetchedAt && (
          <div className="mt-2 text-[10px] font-mono text-muted-foreground">
            fetched {timeAgo(state.fetchedAt)}
          </div>
        )}
      </div>

    </section>
  );
}

function LiveDot({ status }: { status: State["status"] }) {
  const color =
    status === "ready"
      ? "bg-emerald-500"
      : status === "loading" || status === "idle"
      ? "bg-amber-500"
      : "bg-rose-500";
  return (
    <span className="relative flex size-2">
      {status === "ready" && (
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
      )}
      <span className={"relative inline-flex size-2 rounded-full " + color} />
    </span>
  );
}

function Legend() {
  return (
    <div className="flex items-center gap-1.5">
      <span>less</span>
      {[0, 1, 2, 3, 4].map((l) => (
        <span
          key={l}
          className={"inline-block size-2.5 rounded-sm " + levelClass(l)}
        />
      ))}
      <span>more</span>
    </div>
  );
}

function levelClass(level: number) {
  const lv = Math.max(0, Math.min(4, level | 0)) as 0 | 1 | 2 | 3 | 4;
  return [
    "fill-[color:var(--mosaic-0)] [--mosaic-0:#ebedf0] dark:[--mosaic-0:#151b23] bg-[color:var(--mosaic-0)]",
    "fill-[color:var(--mosaic-1)] [--mosaic-1:#aceebb] dark:[--mosaic-1:#033a16] bg-[color:var(--mosaic-1)]",
    "fill-[color:var(--mosaic-2)] [--mosaic-2:#4ac26b] dark:[--mosaic-2:#196c2e] bg-[color:var(--mosaic-2)]",
    "fill-[color:var(--mosaic-3)] [--mosaic-3:#2da44e] dark:[--mosaic-3:#2ea043] bg-[color:var(--mosaic-3)]",
    "fill-[color:var(--mosaic-4)] [--mosaic-4:#116329] dark:[--mosaic-4:#56d364] bg-[color:var(--mosaic-4)]",
  ][lv];
}

type Day = { date: string; count: number; level: number };

function groupIntoWeeks(days: Day[]) {
  if (days.length === 0) return [];
  const weeks: (Day | null)[][] = [];
  let week: (Day | null)[] = [];
  const firstDow = new Date(days[0].date).getUTCDay();
  for (let i = 0; i < firstDow; i++) week.push(null);
  for (const d of days) {
    week.push(d);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  return weeks;
}

function skeletonWeeks(): (Day | null)[][] {
  return Array.from({ length: 53 }, () =>
    Array.from({ length: 7 }, () => ({
      date: "",
      count: 0,
      level: 0,
    })),
  );
}

function buildMonthLabels(weeks: (Day | null)[][]) {
  const labels: { label: string; x: number }[] = [];
  const cell = 11;
  const gap = 3;
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const first = week.find((d): d is Day => d !== null && d.date !== "");
    if (!first) return;
    const m = new Date(first.date).getUTCMonth();
    if (m !== lastMonth) {
      labels.push({
        label: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ][m],
        x: wi * (cell + gap),
      });
      lastMonth = m;
    }
  });
  return labels;
}

function timeAgo(ts: number) {
  const d = Math.floor((Date.now() - ts) / 1000);
  if (d < 5) return "just now";
  if (d < 60) return d + "s ago";
  const m = Math.floor(d / 60);
  if (m < 60) return m + "m ago";
  const h = Math.floor(m / 60);
  return h + "h ago";
}

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
