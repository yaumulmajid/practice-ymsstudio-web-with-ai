import type { CollectionAfterChangeHook } from 'payload'

/**
 * New project brief → notifications. Each channel is optional and switched on by .env:
 *  - WhatsApp via Fonnte (FONNTE_TOKEN; target LEAD_NOTIFY_WA, else the CMS WhatsApp number)
 *  - Email via SMTP (SMTP_HOST …; to LEAD_NOTIFY_TO, else SMTP_FROM)
 * Both run in the background: a provider outage never breaks the visitor's submission.
 */
type Lead = Record<string, unknown> & { id: number | string }

const siteUrl = () => process.env.SITE_URL || 'https://ymsstudio.id'

const rowsOf = (doc: Lead): [string, unknown][] => [
  ['Nama', doc.name],
  ['Bisnis', doc.business],
  ['WhatsApp', doc.whatsapp],
  ['Email', doc.email],
  ['Layanan', doc.service],
  ['Budget', doc.budget],
  ['Target selesai', doc.timeline],
  ['Halaman', doc.sourcePage],
  ['Sumber', [doc.utmSource, doc.utmMedium, doc.utmCampaign].filter(Boolean).join(' / ') || doc.referrer],
]

async function sendWhatsApp(doc: Lead, req: Parameters<CollectionAfterChangeHook>[0]['req']) {
  const token = process.env.FONNTE_TOKEN
  if (!token) return
  let target = (process.env.LEAD_NOTIFY_WA || '').replace(/\D/g, '')
  if (!target) {
    const site = (await req.payload.findGlobal({ slug: 'site-settings', depth: 0, overrideAccess: true })) as { contact?: { waNumber?: string } }
    target = (site?.contact?.waNumber || '').replace(/\D/g, '')
  }
  if (!target) return

  const lines = [
    '🔔 *Brief baru dari website*',
    '',
    ...rowsOf(doc)
      .filter(([, v]) => v)
      .map(([k, v]) => `*${k}:* ${String(v)}`),
    ...(doc.message ? ['', String(doc.message).slice(0, 1500)] : []),
    ...(doc.estimate ? ['', '*Dari kalkulator biaya:*', String(doc.estimate)] : []),
    '',
    `Balas klien: https://wa.me/${String(doc.whatsapp || '').replace(/\D/g, '')}`,
    `Buka di CMS: ${siteUrl()}/admin/collections/leads/${doc.id}`,
  ]
  const body = new URLSearchParams({ target, message: lines.join('\n') })
  const res = await fetch('https://api.fonnte.com/send', {
    method: 'POST',
    headers: { Authorization: token },
    body,
    signal: AbortSignal.timeout(10_000),
  })
  const json = (await res.json().catch(() => ({}))) as { status?: boolean; reason?: string }
  if (!res.ok || json.status === false) throw new Error(`Fonnte: ${json.reason || res.status}`)
}

async function sendEmail(doc: Lead, req: Parameters<CollectionAfterChangeHook>[0]['req']) {
  if (!process.env.SMTP_HOST) return
  const to = process.env.LEAD_NOTIFY_TO || process.env.SMTP_FROM
  if (!to) return
  const esc = (v: unknown) => String(v ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] as string)
  const html = `
    <h2 style="font-family:sans-serif">Brief baru dari website</h2>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      ${rowsOf(doc)
        .filter(([, v]) => v)
        .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#64748b">${k}</td><td style="padding:4px 0"><b>${esc(v)}</b></td></tr>`)
        .join('')}
    </table>
    <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${esc(doc.message)}</p>
    ${doc.estimate ? `<p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap"><b>Dari kalkulator biaya:</b><br>${esc(doc.estimate)}</p>` : ''}
    <p style="font-family:sans-serif;font-size:13px"><a href="${siteUrl()}/admin/collections/leads/${doc.id}">Buka di CMS</a></p>`
  await req.payload.sendEmail({ to, subject: `Brief baru: ${doc.name}${doc.business ? ` (${doc.business})` : ''}`, html })
}

export const notifyNewLead: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  if (operation !== 'create') return doc
  const lead = doc as Lead
  sendWhatsApp(lead, req).catch((err: unknown) => req.payload.logger.error({ err }, 'Lead WhatsApp notification failed'))
  sendEmail(lead, req).catch((err: unknown) => req.payload.logger.error({ err }, 'Lead email notification failed'))
  return doc
}
