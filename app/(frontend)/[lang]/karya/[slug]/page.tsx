// Case study page for a portfolio project: /karya/<slug> (and /en/karya/<slug>).
// Challenge / solution / result sections show only when filled in the CMS.
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowUpRight } from "lucide-react"
import CTA from "@/components/cta"
import { Reveal } from "@/components/motion"
import { Breadcrumbs, JsonLd, Shell } from "@/components/page-shell"
import { getSite } from "@/lib/content"
import { domain, isLang, localePath, PATHS, type Lang, type Project } from "@/lib/i18n"
import { absUrl, breadcrumbLd, crumbs, pageMetadata } from "@/lib/page-meta"
import { services } from "@/lib/page-content/services"
import { pui } from "@/lib/pages-ui"
import { SITE } from "@/lib/seo"

type Props = { params: Promise<{ lang: string; slug: string }> }

export const dynamicParams = true
export function generateStaticParams() {
  return []
}

async function find(lang: Lang, slug: string) {
  const site = await getSite(lang)
  const project = site.projects.find((p) => p.slug === slug)
  return { site, project }
}

export const generateMetadata = async ({ params }: Props) => {
  const { lang, slug } = await params
  if (!isLang(lang)) return {}
  const { project } = await find(lang, slug)
  if (!project) return {}
  return pageMetadata({ lang, path: PATHS.project(slug), title: `${project.title} · ${pui[lang].caseStudy.label}`, description: project.description, generatedImage: true })
}

const relatedService = (p: Project) => services.find((s) => s.projects[0] === p.slug) ?? services.find((s) => s.projects.includes(p.slug))

export default async function Page({ params }: Props) {
  const { lang, slug } = await params
  if (!isLang(lang)) notFound()
  const { site, project: p } = await find(lang, slug)
  if (!p) notFound()
  const u = pui[lang].caseStudy
  const trail = [{ name: p.title, path: PATHS.project(p.slug) }]
  const service = relatedService(p)
  const others = site.projects.filter((x) => x.slug !== p.slug).slice(0, 3)
  const story = [
    { title: u.challenge, text: p.challenge },
    { title: u.solution, text: p.solution },
    { title: u.result, text: p.result },
  ].filter((s) => s.text)

  const ld = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    description: p.description,
    url: absUrl(lang, PATHS.project(p.slug)),
    image: p.image ? `${SITE}${p.image}` : undefined,
    genre: p.category,
    keywords: p.tags.join(", "),
    creator: { "@type": "Organization", name: "YMS Studio", url: SITE },
    about: { "@type": "WebSite", name: p.client, url: p.url },
  }

  return (
    <Shell>
      <JsonLd data={breadcrumbLd(lang, trail)} />
      <JsonLd data={ld} />
      <article className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 md:pb-32">
        <Breadcrumbs items={crumbs(lang, trail)} />

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <Reveal as="p" className="text-xs font-medium uppercase tracking-[0.2em] text-brand-deep">
              {u.label} · {p.category}
            </Reveal>
            <Reveal as="h1" delay={80} className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-ink sm:text-5xl lg:text-6xl">
              {p.title}
            </Reveal>
            <Reveal as="p" delay={160} className="mt-6 max-w-2xl text-base leading-relaxed text-ink/55 sm:text-lg">
              {p.description}
            </Reveal>
          </div>
          <Reveal delay={200}>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 rounded-[28px] border border-ink/[0.07] bg-white p-7 text-sm">
              <div>
                <dt className="text-xs text-ink/40">{u.client}</dt>
                <dd className="mt-1 font-medium text-ink">{p.client}</dd>
              </div>
              <div>
                <dt className="text-xs text-ink/40">{u.category}</dt>
                <dd className="mt-1 font-medium text-ink">{p.category}</dd>
              </div>
              {p.tags.length > 0 && (
                <div className="col-span-2">
                  <dt className="text-xs text-ink/40">{u.tech}</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-ink/10 px-3 py-1 text-xs text-ink/70">
                        {tag}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
              <div className="col-span-2">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-ink py-2.5 pl-5 pr-2.5 text-sm font-medium text-white transition-colors duration-500 hover:bg-brand-deep"
                >
                  {u.visit} · {domain(p.url)}
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10">
                    <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:rotate-45" />
                  </span>
                </a>
              </div>
            </dl>
          </Reveal>
        </div>

        {p.image && (
          <Reveal delay={240} className="relative mt-12 aspect-[16/10] overflow-hidden rounded-[32px] bg-ink/5">
            <Image src={p.image} alt={p.title} fill priority sizes="(max-width: 1200px) 100vw, 1152px" className="object-cover" />
          </Reveal>
        )}

        {story.length > 0 && (
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {story.map((s, i) => (
              <Reveal key={s.title} delay={i * 90} className="rounded-[28px] border border-ink/[0.07] bg-white p-7">
                <p className="font-serif text-2xl italic text-brand">0{i + 1}</p>
                <h2 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-ink">{s.title}</h2>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-ink/60 sm:text-base">{s.text}</p>
              </Reveal>
            ))}
          </div>
        )}

        {service && (
          <Reveal className="mt-16 flex flex-col items-start justify-between gap-4 rounded-[28px] bg-brand-soft/60 p-7 sm:flex-row sm:items-center sm:p-9">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-deep">{u.service}</p>
              <p className="mt-2 text-xl font-semibold tracking-[-0.02em] text-ink">{service.copy[lang].name}</p>
            </div>
            <Link
              href={localePath(lang, PATHS.service(service.slug))}
              className="group inline-flex items-center gap-2 rounded-full bg-ink py-2.5 pl-5 pr-2.5 text-sm font-medium text-white transition-colors duration-500 hover:bg-brand-deep"
            >
              {service.copy[lang].title} {service.copy[lang].em}
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10">
                <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:rotate-45" />
              </span>
            </Link>
          </Reveal>
        )}

        {others.length > 0 && (
          <section className="mt-24">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-3xl">{u.more}</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {others.map((o, i) => (
                <Reveal key={o.slug} delay={i * 80} className="h-full">
                  <Link
                    href={localePath(lang, PATHS.project(o.slug))}
                    className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-ink/[0.07] bg-white p-3 transition-[transform,box-shadow] duration-700 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(11,18,32,0.2)]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] bg-ink/5">
                      {o.image && <Image src={o.image} alt={o.title} fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]" />}
                    </div>
                    <div className="p-4 pt-5">
                      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand-deep">{o.category}</p>
                      <h3 className="mt-2 text-lg font-semibold leading-snug tracking-[-0.02em] text-ink">{o.title}</h3>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </article>

      <CTA />
      <div className="h-3 sm:h-5" />
    </Shell>
  )
}
