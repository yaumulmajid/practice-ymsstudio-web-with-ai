"use client"

// Share an article: WhatsApp, LinkedIn, Facebook, X, copy link (+ the phone's share sheet when available).
import { useEffect, useState } from "react"
import { Check, Facebook, Link2, Linkedin, MessageCircle, Share2, Twitter } from "lucide-react"

type Labels = { share: string; copy: string; copied: string }

export default function ShareButtons({ url, title, labels }: { url: string; title: string; labels: Labels }) {
  const [copied, setCopied] = useState(false)
  const [native, setNative] = useState(false)
  useEffect(() => setNative(typeof navigator !== "undefined" && typeof navigator.share === "function"), [])

  const u = encodeURIComponent(url)
  const text = encodeURIComponent(title)
  const links = [
    { label: "WhatsApp", href: `https://api.whatsapp.com/send?text=${text}%20${u}`, icon: MessageCircle },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, icon: Linkedin },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, icon: Facebook },
    { label: "X", href: `https://twitter.com/intent/tweet?url=${u}&text=${text}`, icon: Twitter },
  ]
  const btn =
    "grid h-10 w-10 place-items-center rounded-full border border-ink/[0.08] bg-white text-ink/60 transition-all duration-500 hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-white"

  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked: ignore */
    }
  }

  return (
    <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-ink/[0.07] pt-8" data-track="share">
      <p className="mr-2 text-sm font-medium text-ink/60">{labels.share}</p>
      {/* Share links are not lead clicks: data-track keeps them out of WhatsApp conversion tracking. */}
      {links.map(({ label, href, icon: Icon }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} data-share className={btn}>
          <Icon size={16} />
        </a>
      ))}
      <button type="button" onClick={copy} aria-label={labels.copy} className={btn}>
        {copied ? <Check size={16} /> : <Link2 size={16} />}
      </button>
      {native && (
        <button type="button" onClick={() => navigator.share({ title, url }).catch(() => {})} aria-label={labels.share} className={btn}>
          <Share2 size={16} />
        </button>
      )}
      <span className="text-xs text-ink/45" aria-live="polite">
        {copied ? labels.copied : ""}
      </span>
    </div>
  )
}
