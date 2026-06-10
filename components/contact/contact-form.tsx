"use client"

import { MoveUpRight } from "lucide-react"
import { useId, type FormEvent } from "react"
import posthog from "posthog-js"

import { Button } from "@/components/ui/button"
import { EMAIL_HREF } from "@/components/nav/nav"

interface ContactFormProps {
  labels: {
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    briefLabel: string
    briefPlaceholder: string
    submitLabel: string
    mailSubject: string
  }
}

export function ContactForm({ labels }: ContactFormProps) {
  const nameId = useId()
  const emailId = useId()
  const briefId = useId()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get("name") ?? "").trim()
    const email = String(data.get("email") ?? "").trim()
    const brief = String(data.get("brief") ?? "").trim()

    posthog.capture("contact_brief_submitted", {
      hasName: name.length > 0,
      hasEmail: email.length > 0,
      briefLength: brief.length,
    })

    const subject = labels.mailSubject.replace("[name]", name || "Anonymous")
    const body = `From: ${name} <${email}>\n\n${brief}`
    window.location.href = `${EMAIL_HREF}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-border bg-card p-6"
      noValidate
    >
      <div className="space-y-2">
        <label
          htmlFor={nameId}
          className="block font-mono text-xs tracking-wider text-muted-foreground uppercase"
        >
          {labels.nameLabel}
        </label>
        <input
          id={nameId}
          name="name"
          type="text"
          required
          placeholder={labels.namePlaceholder}
          className="w-full rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor={emailId}
          className="block font-mono text-xs tracking-wider text-muted-foreground uppercase"
        >
          {labels.emailLabel}
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          required
          placeholder={labels.emailPlaceholder}
          className="w-full rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor={briefId}
          className="block font-mono text-xs tracking-wider text-muted-foreground uppercase"
        >
          {labels.briefLabel}
        </label>
        <textarea
          id={briefId}
          name="brief"
          rows={4}
          required
          placeholder={labels.briefPlaceholder}
          className="w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </div>

      <Button
        type="submit"
        className="w-full rounded-full bg-foreground p-4 text-background lg:w-auto"
      >
        {labels.submitLabel} <MoveUpRight />
      </Button>
    </form>
  )
}
