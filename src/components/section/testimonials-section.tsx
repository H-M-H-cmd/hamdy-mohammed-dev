import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { Quote, Star } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = DATA.testimonials;
  if (testimonials.length === 0) return null;

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4",
        testimonials.length > 1 && "sm:grid-cols-2",
      )}
    >
      {testimonials.map((t) => (
        <figure
          key={t.quote}
          className="flex flex-col gap-4 rounded-xl border border-border bg-card/40 p-6"
        >
          <div className="flex items-center justify-between">
            <Quote
              className="size-5 text-muted-foreground/60"
              aria-hidden
            />
            <div
              className="flex gap-0.5"
              role="img"
              aria-label={`Rated ${t.rating} out of 5`}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "size-3.5",
                    i < t.rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted-foreground/25",
                  )}
                  aria-hidden
                />
              ))}
            </div>
          </div>

          <blockquote className="text-pretty text-[15px] leading-relaxed text-foreground">
            &ldquo;{t.quote}&rdquo;
          </blockquote>

          {t.highlights.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {t.highlights.map((h) => (
                <span
                  key={h}
                  className="rounded-full border border-border bg-background px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                >
                  {h}
                </span>
              ))}
            </div>
          )}

          <figcaption className="mt-auto flex flex-col gap-1 border-t border-border/60 pt-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-foreground">
                {t.author}
              </span>
              {t.sourceUrl ? (
                <a
                  href={t.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] text-muted-foreground underline-offset-2 transition-colors hover:text-foreground hover:underline"
                >
                  via {t.source} &rarr;
                </a>
              ) : (
                <span className="font-mono text-[11px] text-muted-foreground">
                  via {t.source}
                </span>
              )}
            </div>
            <span className="text-xs text-muted-foreground">
              {t.role} &middot; {t.project} &middot; {t.date}
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
