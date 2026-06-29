import { HeroCtas } from "@/components/hero"
import { TrackedSection } from "@/components/section-tracker"

interface HeroProps {
  tagline: {
    role: string
    skills: string
  }
  title: {
    headline: {
      prefix: string
      emphasis: string
    }
    tail: string
  }
  subtitle: {
    prefix: string
    emphasis: string
  }
  ctaPrimary: string
  ctaSecondary: string
}

export const Hero = ({
  tagline,
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
}: HeroProps) => (
  <TrackedSection
    section="hero"
    id="hero"
    className="relative mx-auto flex w-full max-w-6xl flex-col justify-center overflow-hidden px-4 py-14 lg:min-h-screen lg:px-0 lg:py-0"
  >
    <HeroWatermark />
    <div className="flex h-full w-full flex-col gap-y-6">
      <p className="relative z-10 flex flex-wrap items-center gap-x-2 text-mono-up">
        <span className="text-primary">{tagline.role}</span>
        <span aria-hidden className="text-ink-3">
          —
        </span>
        <span>{tagline.skills}</span>
      </p>

      <h1 className="relative z-10 my-auto text-[clamp(2.75rem,12vw,11rem)] leading-[0.85] font-black tracking-[-0.03em]">
        {title.headline.prefix}{" "}
        <span className="font-serif font-normal text-primary italic">
          {title.headline.emphasis}
        </span>
        <br />
        {title.tail}
      </h1>

      <div className="relative z-10 flex flex-col items-start justify-between gap-y-8 lg:flex-row lg:items-end lg:gap-x-8">
        <p className="max-w-3xs font-serif text-xl leading-snug italic lg:max-w-2xs lg:text-3xl">
          {subtitle.prefix}{" "}
          <span className="relative inline-block whitespace-nowrap">
            {subtitle.emphasis}
            <SubtitleUnderline />
          </span>
        </p>
        <HeroCtas primaryLabel={ctaPrimary} secondaryLabel={ctaSecondary} />
      </div>
    </div>
  </TrackedSection>
)

const HeroWatermark = () => (
  <span
    aria-hidden
    className="pointer-events-none absolute top-1/2 right-[-2vw] hidden -translate-y-1/2 font-serif text-[34rem] leading-none text-primary/10 italic select-none lg:block xl:text-[42rem]"
  >
    a
  </span>
)

const SubtitleUnderline = () => (
  <svg
    aria-hidden
    viewBox="0 0 120 8"
    preserveAspectRatio="none"
    className="pointer-events-none absolute -bottom-1 left-0 h-2 w-full text-primary"
  >
    <path
      d="M2 5 Q 20 1, 40 4 T 80 4 T 118 3"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)
