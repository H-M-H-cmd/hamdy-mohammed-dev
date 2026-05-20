"use client";

import { Command } from "cmdk";
import { DATA } from "@/data/resume";
import { allPosts } from "content-collections";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  ArrowUpRight,
  Command as CommandIcon,
  FileText,
  Home,
  Mail,
  Moon,
  Palette,
  SquareTerminal,
  Sun,
  Sparkles,
  Copy,
  Download,
  Github,
  Linkedin,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

function useHotkey(open: boolean, setOpen: (v: boolean) => void) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      } else if (e.key === "/" && !isTyping(e.target)) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpenEvent = () => setOpen(true);
    window.addEventListener("keydown", down);
    window.addEventListener("open-palette", onOpenEvent as EventListener);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("open-palette", onOpenEvent as EventListener);
    };
  }, [open, setOpen]);
}

function isTyping(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    target.isContentEditable ||
    target.getAttribute("role") === "combobox"
  );
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState<"root" | "theme">("root");
  const router = useRouter();
  const { setTheme } = useTheme();
  useHotkey(open, setOpen);

  const close = useCallback(() => {
    setOpen(false);
    setPage("root");
  }, []);

  const go = useCallback(
    (href: string) => {
      close();
      if (/^https?:\/\//.test(href) || href.startsWith("mailto:")) {
        window.open(href, "_blank", "noopener");
      } else {
        router.push(href);
      }
    },
    [router, close],
  );

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {}
      close();
    },
    [close],
  );

  const posts = useMemo(
    () =>
      [...allPosts]
        .sort(
          (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
        )
        .slice(0, 8),
    [],
  );

  if (!open) return <FloatingHint onOpen={() => setOpen(true)} />;

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-start sm:place-items-center bg-black/40 backdrop-blur-sm"
      onClick={close}
    >
      <Command
        label="Command Palette"
        className="mx-auto mt-[15vh] sm:mt-0 w-full max-w-[620px] overflow-hidden rounded-2xl border border-border bg-card shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)] ring-1 ring-black/5 dark:ring-white/5"
        onClick={(e) => e.stopPropagation()}
        loop
      >
        <div className="flex items-center gap-2 border-b border-border px-3">
          <CommandIcon className="size-4 text-muted-foreground shrink-0" />
          <Command.Input
            placeholder={
              page === "theme" ? "Pick a theme…" : "Type a command or search…"
            }
            className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden sm:inline-flex rounded border border-border px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
            ESC
          </kbd>
        </div>

        <Command.List className="max-h-[min(60vh,420px)] overflow-y-auto p-2">
          <Command.Empty className="px-3 py-6 text-sm text-muted-foreground text-center">
            No matches.
          </Command.Empty>

          {page === "root" && (
            <>
              <Group heading="Navigate">
                <Item icon={<Home />} onSelect={() => go("/")}>
                  Go to Home
                </Item>
                <Item icon={<FileText />} onSelect={() => go("/blog")}>
                  Go to Blog
                </Item>
                <Item
                  icon={<SquareTerminal />}
                  onSelect={() => {
                    close();
                    window.dispatchEvent(new CustomEvent("focus-terminal"));
                  }}
                >
                  Focus Terminal
                </Item>
                <Item icon={<Sparkles />} onSelect={() => go("/#projects")}>
                  Jump to Projects
                </Item>
                <Item icon={<Sparkles />} onSelect={() => go("/#skills")}>
                  Jump to Skills
                </Item>
                <Item icon={<Sparkles />} onSelect={() => go("/#work")}>
                  Jump to Work
                </Item>
                <Item icon={<Sparkles />} onSelect={() => go("/#contact")}>
                  Jump to Contact
                </Item>
              </Group>

              <Group heading="Actions">
                <Item
                  icon={<Copy />}
                  onSelect={() => copy(DATA.contact.email)}
                  shortcut="E"
                >
                  Copy email
                </Item>
                <Item
                  icon={<Mail />}
                  onSelect={() => go(`mailto:${DATA.contact.email}`)}
                >
                  Email {DATA.contact.email}
                </Item>
                <Item icon={<Palette />} onSelect={() => setPage("theme")}>
                  Change theme…
                </Item>
                <Item
                  icon={<Download />}
                  onSelect={() => go(DATA.contact.social.GitHub.url)}
                >
                  View resume on GitHub
                </Item>
              </Group>

              <Group heading="Projects">
                {DATA.projects.map((p) => (
                  <Item
                    key={p.title}
                    icon={<ArrowUpRight />}
                    onSelect={() => go(p.href)}
                    value={`${p.title} ${p.technologies.join(" ")}`}
                  >
                    <span>{p.title}</span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      {p.dates}
                    </span>
                  </Item>
                ))}
              </Group>

              {posts.length > 0 && (
                <Group heading="Blog">
                  {posts.map((post) => {
                    const slug = post._meta.path.replace(/\.mdx$/, "");
                    return (
                      <Item
                        key={slug}
                        icon={<FileText />}
                        onSelect={() => go(`/blog/${slug}`)}
                        value={`${post.title} ${post.summary}`}
                      >
                        <span>{post.title}</span>
                        <span className="ml-2 text-xs text-muted-foreground">
                          {post.publishedAt}
                        </span>
                      </Item>
                    );
                  })}
                </Group>
              )}

              <Group heading="Social">
                <Item
                  icon={<Github />}
                  onSelect={() => go(DATA.contact.social.GitHub.url)}
                >
                  Open GitHub
                </Item>
                <Item
                  icon={<Linkedin />}
                  onSelect={() => go(DATA.contact.social.LinkedIn.url)}
                >
                  Open LinkedIn
                </Item>
                <Item
                  icon={<ArrowUpRight />}
                  onSelect={() => go(DATA.contact.social.X.url)}
                >
                  Open X / Twitter
                </Item>
              </Group>
            </>
          )}

          {page === "theme" && (
            <Group heading="Theme">
              <Item
                icon={<Sun />}
                onSelect={() => {
                  setTheme("light");
                  close();
                }}
              >
                Light
              </Item>
              <Item
                icon={<Moon />}
                onSelect={() => {
                  setTheme("dark");
                  close();
                }}
              >
                Dark
              </Item>
              <Item
                icon={<Palette />}
                onSelect={() => {
                  setTheme("system");
                  close();
                }}
              >
                System
              </Item>
            </Group>
          )}
        </Command.List>

        <div className="flex items-center justify-between border-t border-border px-3 py-2 text-[11px] font-mono text-muted-foreground">
          <div className="flex items-center gap-2">
            <kbd className="rounded border border-border px-1.5 py-0.5">↑↓</kbd>
            navigate
            <kbd className="rounded border border-border px-1.5 py-0.5">↵</kbd>
            select
          </div>
          <div className="flex items-center gap-2">
            hamdy/portfolio ·{" "}
            <kbd className="rounded border border-border px-1.5 py-0.5">⌘K</kbd>
          </div>
        </div>
      </Command>
    </div>
  );
}

function Group({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <Command.Group
      heading={heading}
      className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground"
    >
      {children}
    </Command.Group>
  );
}

function Item({
  icon,
  children,
  onSelect,
  shortcut,
  value,
}: {
  icon?: React.ReactNode;
  children: React.ReactNode;
  onSelect: () => void;
  shortcut?: string;
  value?: string;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      value={value}
      className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm aria-selected:bg-accent aria-selected:text-accent-foreground data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
    >
      {icon && (
        <span className="flex size-5 items-center justify-center text-muted-foreground [&>svg]:size-4">
          {icon}
        </span>
      )}
      <span className="flex-1 truncate">{children}</span>
      {shortcut && (
        <kbd className="rounded border border-border px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
          {shortcut}
        </kbd>
      )}
    </Command.Item>
  );
}

function FloatingHint({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      aria-label="Open command palette"
      className="group fixed bottom-24 right-4 z-40 flex items-center gap-2 rounded-full border border-border bg-card/95 px-3 py-2 font-mono text-[11px] text-muted-foreground shadow-lg backdrop-blur hover:text-foreground transition-colors"
    >
      <CommandIcon className="size-3.5" />
      <span className="hidden sm:inline">press</span>
      <kbd className="rounded border border-border px-1.5 py-0.5">⌘K</kbd>
    </button>
  );
}
