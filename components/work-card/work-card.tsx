"use client"

import Image from "next/image"
import { MoveUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

interface WorkCardMetric {
  value: string
  label: string
}

interface WorkCardProps {
  image: {
    src: {
      mobile: { default: string; dark: string }
      desktop: { default: string; dark: string }
    }
    alt: string
  }
  title: { prefix: string; emphasis: string }
  tags: string
  description: string
  liveUrl: string
  liveLabel: string
  metrics: WorkCardMetric[]
}

export function WorkCard({
  image,
  title,
  tags,
  description,
  liveUrl,
  liveLabel,
  metrics,
}: WorkCardProps) {
  const { theme } = useTheme()

  return (
    <article className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
      <div className="relative aspect-4/3 overflow-hidden lg:aspect-3/1">
        {theme === "dark" ? (
          <>
            <Image
              src={image.src.mobile.dark}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 64rem, 100vw"
              className="object-cover lg:hidden"
              priority={false}
            />
            <Image
              src={image.src.desktop.dark}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 64rem, 100vw"
              className="hidden object-cover lg:block"
              priority={false}
            />
          </>
        ) : (
          <>
            <Image
              src={image.src.mobile.default}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 64rem, 100vw"
              className="object-cover lg:hidden"
              priority={false}
            />
            <Image
              src={image.src.desktop.default}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 64rem, 100vw"
              className="hidden object-cover lg:block"
              priority={false}
            />
          </>
        )}
      </div>

      <div className="space-y-6 p-6 lg:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <h3 className="text-2xl font-semibold lg:text-3xl">
            {title.prefix}{" "}
            <span className="font-serif font-medium italic">
              {title.emphasis}
            </span>
          </h3>
          <span className="font-mono text-xs tracking-wider text-muted-foreground">
            {tags}
          </span>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <p className="max-w-prose text-sm lg:text-base">{description}</p>
          <Button
            asChild
            variant="outline"
            className="w-fit shrink-0 rounded-full"
          >
            <a href={liveUrl} target="_blank" rel="noopener noreferrer">
              {liveLabel} <MoveUpRight />
            </a>
          </Button>
        </div>

        <hr className="border-t border-dashed border-border" />

        <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {metrics.map(({ value, label }) => (
            <div key={label} className="flex flex-col gap-1">
              <dt className="font-serif text-2xl font-medium italic lg:text-3xl">
                {value}
              </dt>
              <dd className="font-mono text-tiny tracking-wider text-muted-foreground uppercase">
                {label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  )
}
