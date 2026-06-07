/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import GithubMosaic from "@/components/section/github-mosaic";
import TestimonialsSection from "@/components/section/testimonials-section";
import TerminalHero from "@/components/terminal-hero";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { getGithubSummary } from "@/lib/github";
import { ArrowUpRight, FileText } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export default async function Page() {
  const summary = await getGithubSummary();
  const stats = summary
    ? {
        repos: summary.user.public_repos,
        followers: summary.user.followers,
        stars: summary.stars,
        contributionsLastYear: summary.contributions
          ? Object.values(summary.contributions.total).reduce((a, b) => a + b, 0)
          : 0,
      }
    : null;

  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <section id="hero" className="scroll-mt-16">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="flex flex-col gap-5">
            <BlurFade delay={BLUR_FADE_DELAY}>
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                      <span className="relative flex size-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                        <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                      </span>
                      Available for work
                    </span>
                    <a
                      href="https://www.prolinkeg.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-0.5 font-mono text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span className="size-1.5 rotate-45 bg-amber-500" aria-hidden />
                      Building Manifest ERP
                      <ArrowUpRight
                        className="size-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                        aria-hidden
                      />
                    </a>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {DATA.location}
                    </span>
                  </div>
                  <h1 className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl">
                    Hi, I&apos;m {DATA.name.split(" ")[0]}.
                  </h1>
                </div>
                <img
                  src={DATA.avatarUrl}
                  alt={DATA.name}
                  className="size-16 flex-none rounded-full border border-border object-cover ring-2 ring-border/30 sm:size-20"
                />
              </div>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
                {DATA.description}
              </p>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[13px] text-muted-foreground">
                <span>
                  <span className="font-semibold text-foreground tabular-nums">
                    {DATA.projects.length}
                  </span>{" "}
                  products shipped
                </span>
                <span className="h-3 w-px bg-border" aria-hidden />
                <span>
                  <span className="font-semibold text-foreground tabular-nums">
                    {DATA.work.length}
                  </span>{" "}
                  client engagements
                </span>
                <span className="h-3 w-px bg-border" aria-hidden />
                <span>
                  <span className="font-semibold text-foreground">solo</span>{" "}
                  founder &amp; engineer
                </span>
                <span className="h-3 w-px bg-border" aria-hidden />
                <span>
                  <span className="font-semibold text-foreground">MENA</span>{" "}
                  market
                </span>
              </div>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <div className="flex flex-wrap gap-2.5">
                <Button asChild className="gap-2">
                  <a href={`mailto:${DATA.contact.email}`}>
                    <Icons.email className="size-4" />
                    Get in touch
                  </a>
                </Button>
                <Button asChild variant="outline" className="gap-2">
                  <a href="#work">View work</a>
                </Button>
                <Button asChild variant="outline" className="gap-2">
                  <a
                    href={DATA.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText className="size-4" />
                    Résumé
                  </a>
                </Button>
                <Button asChild variant="outline" className="gap-2">
                  <a
                    href={DATA.contact.social.GitHub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icons.github className="size-4" />
                    GitHub
                  </a>
                </Button>
              </div>
            </BlurFade>
          </div>

          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <div className="flex flex-col gap-1.5">
              <TerminalHero stats={stats} defaultMinimized />
              <p className="px-1 font-mono text-[11px] text-muted-foreground">
                ↑ interactive terminal — try{" "}
                <span className="text-foreground">whoami</span>,{" "}
                <span className="text-foreground">projects</span>, or{" "}
                <span className="text-foreground">sudo hire-me</span>. Press{" "}
                <kbd className="rounded border border-border bg-card px-1 py-0.5">
                  ⌘K
                </kbd>{" "}
                for the command palette.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>

      <section id="about" className="scroll-mt-16">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold">About</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                /01
              </span>
            </div>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 3.5}>
            <p className="text-xl sm:text-2xl font-semibold tracking-tight leading-snug text-foreground text-balance">
              {DATA.headline}
            </p>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert prose-strong:text-foreground prose-a:text-foreground prose-a:decoration-foreground/30 hover:prose-a:decoration-foreground">
              <Markdown>{DATA.summary}</Markdown>
            </div>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 4.5}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              {DATA.facts.map((f) => (
                <div
                  key={f.label}
                  className="group relative overflow-hidden rounded-xl border border-border bg-card/40 px-3 py-2.5 transition-colors hover:bg-card"
                >
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {f.label}
                  </div>
                  <div className="mt-0.5 text-sm font-medium text-foreground truncate">
                    {f.value}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </BlurFade>
        </div>
      </section>

      <section id="work" className="scroll-mt-16">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Selected Work</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <WorkSection />
          </BlurFade>
        </div>
      </section>

      {DATA.education.length > 0 && (
        <section id="education" className="scroll-mt-16">
          <div className="flex min-h-0 flex-col gap-y-6">
            <BlurFade delay={BLUR_FADE_DELAY * 7}>
              <h2 className="text-xl font-bold">Education</h2>
            </BlurFade>
            <div className="flex flex-col gap-8">
              {DATA.education.map((education, index) => (
                <BlurFade
                  key={education.school}
                  delay={BLUR_FADE_DELAY * 8 + index * 0.05}
                >
                  <Link
                    href={education.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-x-3 justify-between group"
                  >
                    <div className="flex items-center gap-x-3 flex-1 min-w-0">
                      {education.logoUrl ? (
                        <img
                          src={education.logoUrl}
                          alt={education.school}
                          className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
                        />
                      ) : (
                        <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
                      )}
                      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                        <div className="font-semibold leading-none flex items-center gap-2">
                          {education.school}
                          <ArrowUpRight
                            className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                            aria-hidden
                          />
                        </div>
                        <div className="font-sans text-sm text-muted-foreground">
                          {education.degree}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                      <span>
                        {education.start} - {education.end}
                      </span>
                    </div>
                  </Link>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="skills" className="scroll-mt-16">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Stack</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-2">
            {DATA.skills.map((skill, id) => {
              const dark = ("colorDark" in skill && skill.colorDark) || skill.color;
              return (
                <BlurFade key={skill.name} delay={BLUR_FADE_DELAY * 10 + id * 0.03}>
                  <div className="border bg-background border-border ring-2 ring-border/20 rounded-xl h-8 w-fit px-3.5 flex items-center gap-2">
                    <img
                      src={`https://cdn.simpleicons.org/${skill.slug}/${skill.color}`}
                      alt=""
                      aria-hidden
                      loading="lazy"
                      className="size-4 object-contain dark:hidden"
                    />
                    <img
                      src={`https://cdn.simpleicons.org/${skill.slug}/${dark}`}
                      alt=""
                      aria-hidden
                      loading="lazy"
                      className="hidden size-4 object-contain dark:inline-block"
                    />
                    <span className="text-foreground text-sm font-medium">
                      {skill.name}
                    </span>
                  </div>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </section>

      <section id="projects" className="scroll-mt-16">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <ProjectsSection />
        </BlurFade>
      </section>

      <section id="github" className="scroll-mt-16">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <GithubMosaic />
        </BlurFade>
      </section>

      <section id="testimonials" className="scroll-mt-16">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold">Testimonials</h2>
              <a
                href={DATA.upwork.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-sm text-muted-foreground underline-offset-2 transition-colors hover:text-foreground hover:underline"
              >
                <span className="font-medium text-foreground">
                  {DATA.upwork.jobSuccess} Job Success
                </span>{" "}
                &middot; {DATA.upwork.rating.toFixed(1)} rating on Upwork &rarr;
              </a>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 15}>
            <TestimonialsSection />
          </BlurFade>
        </div>
      </section>

      <section id="contact" className="scroll-mt-16">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
