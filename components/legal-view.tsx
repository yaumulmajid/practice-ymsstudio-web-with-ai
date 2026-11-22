// Privacy policy / terms of service page.
import { Breadcrumbs, JsonLd, PageHero, Shell } from "@/components/page-shell"
import { Reveal } from "@/components/motion"
import { getSite } from "@/lib/content"
import type { Lang } from "@/lib/i18n"
import { breadcrumbLd, crumbs } from "@/lib/page-meta"
import type { LegalPage } from "@/lib/page-content/legal"
import { pui } from "@/lib/pages-ui"

export default async function LegalView({ lang, page, path }: { lang: Lang; page: LegalPage; path: string }) {
  const u = pui[lang]
  const { settings } = await getSite(lang)
  const name = `${page.title} ${page.em}`
  const updated = new Date(`${page.updated}T00:00:00Z`).toLocaleDateString(lang === "id" ? "id-ID" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })

  return (
    <Shell>
      <JsonLd data={breadcrumbLd(lang, [{ name, path }])} />
      <article className="mx-auto max-w-3xl px-5 pb-24 sm:px-8 md:pb-32">
        <Breadcrumbs items={crumbs(lang, [{ name, path }])} />
        <PageHero label="Legal" title={page.title} em={page.em} text={page.intro}>
          <Reveal as="p" delay={200} className="mt-5 text-sm text-ink/40">
            {u.updated}: <time dateTime={page.updated}>{updated}</time>
          </Reveal>
        </PageHero>

        <div className="fade-up prose-yms mt-12 border-t border-ink/[0.07] pt-4" style={{ ["--d" as string]: "250ms" }}>
          {page.sections.map((s) => (
            <section key={s.title}>
              <h2>{s.title}</h2>
              {s.blocks.map((b, i) =>
                Array.isArray(b) ? (
                  <ul key={i}>
                    {b.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                ) : (
                  <p key={i}>{b}</p>
                ),
              )}
            </section>
          ))}
          {settings.email && (
            <p>
              {u.legalNote} <a href={`mailto:${settings.email}`}>{settings.email}</a>.
            </p>
          )}
        </div>
      </article>
    </Shell>
  )
}
