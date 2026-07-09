import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface StackCardProps {
  label: string
  title: string
  description: { template: string; code: string }
}

export function StackCard({ label, title, description }: StackCardProps) {
  const hasCode =
    description.code.trim().length > 0 &&
    description.template.includes("{code}")
  const [before, after] = hasCode
    ? description.template.split("{code}")
    : [description.template.replace("{code}", ""), ""]

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="space-y-3">
        <span className="font-mono text-tiny tracking-wider text-gray-600 uppercase">
          {label}
        </span>
        <CardTitle as="h3" className="text-xl">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          {before}
          {hasCode && (
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              {description.code}
            </code>
          )}
          {after}
        </CardDescription>
      </CardContent>
    </Card>
  )
}
