"use client";

import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import {
  KeyboardEvent as ReactKeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type LineKind = "out" | "in" | "err" | "banner" | "raw";
type Line = { id: number; kind: LineKind; text: string; html?: React.ReactNode };

type CommandCtx = {
  args: string[];
  push: (text: string | React.ReactNode, kind?: LineKind) => void;
  clear: () => void;
  setTheme: (t: "light" | "dark" | "system") => void;
  openTerminalOverlay: (open: boolean) => void;
  copy: (text: string, label?: string) => Promise<void>;
  stats: TerminalStats | null;
};

type Command = {
  name: string;
  aliases?: string[];
  summary: string;
  run: (ctx: CommandCtx) => void | Promise<void>;
  hidden?: boolean;
};

export type TerminalStats = {
  repos: number;
  followers: number;
  stars: number;
  contributionsLastYear: number;
};

const BANNER = [
  "  _   _    _    __  __ ______   __",
  " | | | |  / \\  |  \\/  |  _ \\ \\ / /",
  " | |_| | / _ \\ | |\\/| | | | \\ V /",
  " |  _  |/ ___ \\| |  | | |_| || |",
  " |_| |_/_/   \\_\\_|  |_|____/ |_|",
].join("\n");

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[11px] px-1.5 py-0.5 mr-1 mb-1 rounded border border-zinc-700 text-zinc-300 bg-zinc-900/60">
      {children}
    </span>
  );
}

function Anchor({ href, children }: { href: string; children: React.ReactNode }) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="text-emerald-400 underline decoration-emerald-400/40 hover:decoration-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-sm"
    >
      {children}
    </a>
  );
}

export default function TerminalHero({
  stats,
  onOpenPalette,
  defaultMinimized = false,
}: {
  stats: TerminalStats | null;
  onOpenPalette?: () => void;
  defaultMinimized?: boolean;
}) {
  const { setTheme } = useTheme();
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number | null>(null);
  const [minimized, setMinimized] = useState(defaultMinimized);
  const idRef = useRef(0);
  const didInitRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const pushLine = useCallback((text: string | React.ReactNode, kind: LineKind = "out") => {
    setLines((prev) => [
      ...prev,
      typeof text === "string"
        ? { id: ++idRef.current, kind, text }
        : { id: ++idRef.current, kind: "raw", text: "", html: text },
    ]);
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const copy = useCallback(
    async (text: string, label?: string) => {
      const display = label || text;
      try {
        await navigator.clipboard.writeText(text);
        pushLine("copied " + display + " to clipboard");
      } catch (_e) {
        pushLine("clipboard unavailable — manually: " + text, "err");
      }
    },
    [pushLine],
  );

  const commands = useMemo<Command[]>(() => {
    const list: Command[] = [
      {
        name: "help",
        aliases: ["?"],
        summary: "show available commands",
        run: ({ push }) => {
          push(
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
              {list
                .filter((c) => !c.hidden)
                .map((c) => (
                  <div key={c.name} className="font-mono text-[13px]">
                    <span className="text-emerald-400">{c.name}</span>
                    <span className="text-zinc-500"> — {c.summary}</span>
                  </div>
                ))}
            </div>,
          );
          push(
            <div className="text-zinc-500 text-xs mt-2">
              tip: <kbd className="text-zinc-300">Tab</kbd> autocomplete · <kbd className="text-zinc-300">↑/↓</kbd> history · <kbd className="text-zinc-300">⌘K</kbd> palette · <kbd className="text-zinc-300">Ctrl+L</kbd> clear
            </div>,
          );
        },
      },
      {
        name: "whoami",
        summary: "short intro",
        run: ({ push }) => {
          push(
            <div>
              <span className="text-emerald-400">{DATA.name}</span>{" "}
              <span className="text-zinc-500">— {DATA.location}</span>
              <div className="text-zinc-300 mt-1">{DATA.description}</div>
            </div>,
          );
        },
      },
      {
        name: "about",
        aliases: ["bio"],
        summary: "longer summary",
        run: ({ push }) => {
          push(
            <div className="text-zinc-300 leading-relaxed">
              {DATA.summary
                .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
                .trim()}
            </div>,
          );
        },
      },
      {
        name: "skills",
        aliases: ["stack"],
        summary: "the stack",
        run: ({ push }) => {
          push(
            <div className="flex flex-wrap">
              {DATA.skills.map((s) => (
                <Chip key={s.name}>{s.name}</Chip>
              ))}
            </div>,
          );
        },
      },
      {
        name: "projects",
        aliases: ["ls projects", "ls"],
        summary: "list featured projects (open <n> to visit)",
        run: ({ push, args }) => {
          const n = args[0] ? parseInt(args[0], 10) : NaN;
          if (!Number.isNaN(n)) {
            const proj = DATA.projects[n - 1];
            if (!proj) return push(`no project #${n}`, "err");
            window.open(proj.href, "_blank", "noopener");
            return push(`opening ${proj.title} → ${proj.href}`);
          }
          push(
            <div className="space-y-1.5">
              {DATA.projects.map((p, i) => (
                <div key={p.title} className="font-mono text-[13px]">
                  <span className="text-zinc-500 w-6 inline-block">
                    {String(i + 1).padStart(2, "0")}.
                  </span>{" "}
                  <Anchor href={p.href}>{p.title}</Anchor>{" "}
                  <span className="text-zinc-500">· {p.dates}</span>
                </div>
              ))}
              <div className="text-zinc-500 text-xs mt-2">
                run <span className="text-emerald-400">projects &lt;n&gt;</span> to open in a new tab
              </div>
            </div>,
          );
        },
      },
      {
        name: "open",
        hidden: true,
        summary: "open project #n",
        run: ({ args, push }) => {
          const n = parseInt(args[0] ?? "", 10);
          const proj = DATA.projects[n - 1];
          if (!proj) return push("usage: open <n>", "err");
          window.open(proj.href, "_blank", "noopener");
          push(`opening ${proj.title}`);
        },
      },
      {
        name: "experience",
        aliases: ["work", "cv"],
        summary: "work / client engagements",
        run: ({ push }) => {
          push(
            <div className="space-y-2">
              {DATA.work.map((w) => (
                <div key={w.company} className="font-mono text-[13px]">
                  <div>
                    <span className="text-emerald-400">{w.company}</span>{" "}
                    <span className="text-zinc-500">· {w.title}</span>{" "}
                    <span className="text-zinc-600">
                      [{w.start} — {w.end ?? "Present"}]
                    </span>
                  </div>
                  <div className="text-zinc-400 text-[12px] pl-3 leading-relaxed">
                    {w.description}
                  </div>
                </div>
              ))}
            </div>,
          );
        },
      },
      {
        name: "contact",
        aliases: ["social"],
        summary: "how to reach me",
        run: ({ push }) => {
          const s = DATA.contact.social;
          push(
            <div className="font-mono text-[13px] space-y-0.5">
              <div>email     · <Anchor href={`mailto:${DATA.contact.email}`}>{DATA.contact.email}</Anchor></div>
              <div>github    · <Anchor href={s.GitHub.url}>{s.GitHub.url}</Anchor></div>
              <div>linkedin  · <Anchor href={s.LinkedIn.url}>{s.LinkedIn.url}</Anchor></div>
            </div>,
          );
        },
      },
      {
        name: "email",
        hidden: true,
        summary: "copy email address",
        run: (ctx) => ctx.copy(DATA.contact.email, "email"),
      },
      {
        name: "github",
        summary: "open my github",
        run: ({ push }) => {
          window.open(DATA.contact.social.GitHub.url, "_blank", "noopener");
          push(`opening ${DATA.contact.social.GitHub.url}`);
        },
      },
      {
        name: "resume",
        aliases: ["cv"],
        summary: "open my résumé (pdf)",
        run: ({ push }) => {
          window.open(DATA.resumeUrl, "_blank", "noopener");
          push("opening résumé.pdf …");
        },
      },
      {
        name: "stars",
        summary: "live github stats",
        run: ({ push, stats }) => {
          if (!stats) return push("github stats unavailable", "err");
          push(
            <div className="font-mono text-[13px]">
              <div>public repos      · <span className="text-emerald-400">{stats.repos}</span></div>
              <div>followers         · <span className="text-emerald-400">{stats.followers}</span></div>
              <div>stars (self)      · <span className="text-emerald-400">{stats.stars}</span></div>
              <div>contributions/yr  · <span className="text-emerald-400">{stats.contributionsLastYear}</span></div>
            </div>,
          );
        },
      },
      {
        name: "blog",
        summary: "open the blog",
        run: ({ push }) => {
          window.location.href = "/blog";
          push("navigating to /blog …");
        },
      },
      {
        name: "theme",
        summary: "theme [light|dark|system]",
        run: ({ args, push, setTheme }) => {
          const t = args[0];
          if (t !== "light" && t !== "dark" && t !== "system") {
            return push("usage: theme [light|dark|system]", "err");
          }
          setTheme(t);
          push(`theme → ${t}`);
        },
      },
      {
        name: "palette",
        aliases: ["cmd"],
        summary: "open the ⌘K command palette",
        run: ({ push }) => {
          window.dispatchEvent(new CustomEvent("open-palette"));
          push("palette open");
        },
      },
      {
        name: "sudo",
        hidden: true,
        summary: "don't",
        run: ({ args, push }) => {
          if (args.join(" ") === "hire-me" || args[0] === "hire") {
            push(
              <div>
                <div className="text-emerald-400">[sudo] you have the permissions.</div>
                <div className="text-zinc-300">
                  open to senior / staff full-stack roles. reach me at{" "}
                  <Anchor href={`mailto:${DATA.contact.email}`}>
                    {DATA.contact.email}
                  </Anchor>{" "}
                  — I reply within 24h.
                </div>
              </div>,
            );
            return;
          }
          push("permission denied: nice try 🙃", "err");
        },
      },
      {
        name: "clear",
        aliases: ["cls"],
        summary: "clear the terminal",
        run: ({ clear }) => clear(),
      },
      {
        name: "exit",
        summary: "minimize terminal",
        run: ({ openTerminalOverlay }) => openTerminalOverlay(false),
      },
    ];
    return list;
  }, []);

  const commandMap = useMemo(() => {
    const m = new Map<string, Command>();
    for (const c of commands) {
      m.set(c.name, c);
      for (const a of c.aliases ?? []) m.set(a, c);
    }
    return m;
  }, [commands]);

  const run = useCallback(
    async (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;
      pushLine(
        <div>
          <span className="text-emerald-400">hamdy@prolink</span>
          <span className="text-zinc-500">:</span>
          <span className="text-sky-400">~</span>
          <span className="text-zinc-500">$</span> {trimmed}
        </div>,
        "in",
      );
      const [head, ...rest] = trimmed.split(/\s+/);
      const cmd = commandMap.get(head.toLowerCase());
      if (!cmd) {
        pushLine(
          <span>
            <span className="text-rose-400">command not found:</span> {head} —{" "}
            type <span className="text-emerald-400">help</span>
          </span>,
          "err",
        );
        return;
      }
      await cmd.run({
        args: rest,
        push: pushLine,
        clear,
        setTheme: (t) => setTheme(t),
        openTerminalOverlay: setMinimized,
        copy,
        stats,
      });
    },
    [commandMap, pushLine, clear, setTheme, copy, stats],
  );

  useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;
    pushLine(
      <pre className="text-emerald-400/80 text-[11px] sm:text-sm leading-tight font-mono whitespace-pre">
        {BANNER}
      </pre>,
    );
    pushLine(
      <div className="text-zinc-400 text-xs mt-1">
        welcome. type <span className="text-emerald-400">help</span> for commands ·{" "}
        <span className="text-emerald-400">whoami</span> ·{" "}
        <span className="text-emerald-400">projects</span> ·{" "}
        <span className="text-emerald-400">sudo hire-me</span>
      </div>,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const onKey = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const v = input;
      setInput("");
      if (v.trim()) {
        setHistory((h) => [...h, v]);
      }
      setHistoryIdx(null);
      void run(v);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const next = historyIdx === null ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(next);
      setInput(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === null) return;
      const next = historyIdx + 1;
      if (next >= history.length) {
        setHistoryIdx(null);
        setInput("");
      } else {
        setHistoryIdx(next);
        setInput(history[next]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const names = Array.from(new Set(commands.flatMap((c) => [c.name, ...(c.aliases ?? [])])))
        .filter((n) => n.startsWith(input.toLowerCase()));
      if (names.length === 1) setInput(names[0] + " ");
      else if (names.length > 1) pushLine(names.join("  "));
    } else if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      clear();
    } else if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onOpenPalette?.();
    }
  };

  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className="group flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 font-mono text-sm shadow-sm hover:bg-accent/40 transition-colors w-full"
      >
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-red-500/70" />
          <span className="size-2.5 rounded-full bg-yellow-500/70" />
          <span className="size-2.5 rounded-full bg-green-500/70" />
        </span>
        <span className="text-muted-foreground">hamdy@prolink:~$</span>
        <span className="ml-auto text-xs text-muted-foreground group-hover:text-foreground">
          open terminal →
        </span>
      </button>
    );
  }

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] ring-1 ring-white/5"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 border-b border-zinc-800/80 bg-zinc-900/70 px-3 py-2">
        <div className="flex gap-1.5">
          <button
            aria-label="close"
            onClick={(e) => {
              e.stopPropagation();
              setMinimized(true);
            }}
            className="size-3 rounded-full bg-red-500/80 hover:bg-red-500"
          />
          <button
            aria-label="minimize"
            onClick={(e) => {
              e.stopPropagation();
              setMinimized(true);
            }}
            className="size-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500"
          />
          <button
            aria-label="maximize"
            onClick={(e) => e.stopPropagation()}
            className="size-3 rounded-full bg-green-500/80 hover:bg-green-500"
          />
        </div>
        <div className="flex-1 text-center text-[11px] font-mono text-zinc-400 tracking-wide select-none">
          hamdy — portfolio.tsx
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
          <kbd className="rounded border border-zinc-700 bg-zinc-900 px-1.5 py-0.5">⌘K</kbd>
          <span>palette</span>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="max-h-[60vh] sm:max-h-[520px] overflow-y-auto px-4 py-4 font-mono text-[13px] leading-relaxed text-zinc-200"
      >
        {lines.map((l) => (
          <div
            key={l.id}
            className={cn(
              "whitespace-pre-wrap break-words",
              l.kind === "err" && "text-rose-400",
              l.kind === "in" && "text-zinc-400",
            )}
          >
            {l.html ?? l.text}
          </div>
        ))}
        <div className="mt-1 flex items-center gap-1.5">
          <span className="text-emerald-400">hamdy@prolink</span>
          <span className="text-zinc-500">:</span>
          <span className="text-sky-400">~</span>
          <span className="text-zinc-500">$</span>
          <input
            ref={inputRef}
            value={input}
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            className="flex-1 bg-transparent outline-none text-zinc-100 caret-emerald-400 placeholder:text-zinc-600"
            placeholder="try: whoami · projects · sudo hire-me"
            aria-label="terminal input"
          />
        </div>
      </div>
    </div>
  );
}
