import type { CollectionAfterChangeHook } from 'payload'

/**
 * Emails a new brief to LEAD_NOTIFY_TO (or the site's contact email) when SMTP is
 * configured (see payload.config.ts). Never blocks or fails the form submission.
 */
export const notifyNewLead: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  if (operation !== 'create' || !process.env.SMTP_HOST) return doc
  const to = process.env.LEAD_NOTIFY_TO || process.env.SMTP_FROM
  if (!to) return doc
  const rows: [string, unknown][] = [
    ['Nama', doc.name],
    ['Bisnis', doc.business],
    ['WhatsApp', doc.whatsapp],
    ['Email', doc.email],
    ['Layanan', doc.service],
    ['Budget', doc.budget],
    ['Target selesai', doc.timeline],
    ['Halaman', doc.sourcePage],
  ]
  const esc = (v: unknown) => String(v ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] as string)
  const html = `
    <h2 style="font-family:sans-serif">Brief baru dari website</h2>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      ${rows.filter(([, v]) => v).map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#64748b">${k}</td><td style="padding:4px 0"><b>${esc(v)}</b></td></tr>`).join('')}
    </table>
    <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${esc(doc.message)}</p>
    <p style="font-family:sans-serif;font-size:13px"><a href="${process.env.SITE_URL || 'https://ymsstudio.id'}/admin/collections/leads/${doc.id}">Buka di CMS</a></p>`
  // Fire and forget: a mail outage must not break the visitor's submission.
  req.payload
    .sendEmail({ to, subject: `Brief baru: ${doc.name}${doc.business ? ` (${doc.business})` : ''}`, html })
    .catch((err: unknown) => req.payload.logger.error({ err }, 'Lead notification email failed'))
  return doc
}
