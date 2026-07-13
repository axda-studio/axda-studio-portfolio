import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface PillarCardProps {
  id: number
  label: string
  title: { template: string; emphasis: string }
  description: string
  badges: string[]
}

export function PillarCard({
  id,
  label,
  title,
  description,
  badges,
}: PillarCardProps) {
  const [before, after] = title.template.split("{emphasis}")

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="space-y-2">
        <span className="font-mono text-tiny text-gray-600">
          {String(id).padStart(2, "0")} — {label}
        </span>
        <CardTitle as="h3" className="text-xl">
          {before}
          <span className="font-serif font-medium text-primary italic">
            {title.emphasis}
          </span>
          {after}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-6">
        <CardDescription>{description}</CardDescription>
        <ul className="mt-auto flex flex-wrap gap-4 px-4">
          {badges.map((badge) => (
            <li key={badge} className="rounded-full border px-3 py-1 text-xs">
              {badge}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
