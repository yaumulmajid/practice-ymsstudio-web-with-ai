/* Branding for the Payload admin (/admin). Referenced by path in payload.config.ts. */

/** Logo on the login screen. */
export const Logo = () => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, fontFamily: 'Inter, system-ui, sans-serif', color: '#0b1220' }}>
    <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: '-0.03em' }}>YMS</span>
    <span style={{ width: 8, height: 8, borderRadius: 999, background: '#2a8e9e', display: 'inline-block' }} />
    <span style={{ fontSize: 30, fontStyle: 'italic', fontFamily: 'Georgia, serif', opacity: 0.7 }}>studio</span>
  </div>
)

/** Small mark in the admin navigation. */
export const Icon = () => (
  <span
    style={{
      display: 'grid',
      placeItems: 'center',
      width: 28,
      height: 28,
      borderRadius: 8,
      background: '#0b1220',
      color: '#fff',
      fontSize: 12,
      fontWeight: 700,
      fontFamily: 'Inter, system-ui, sans-serif',
    }}
  >
    Y
  </span>
)

export const BeforeLogin = () => (
  <p style={{ textAlign: 'center', color: 'rgba(11,18,32,0.6)', margin: '0 0 8px' }}>
    Masuk untuk mengelola konten website YMS Studio.
  </p>
)

/** "Lihat website" link under the navigation. */
export const ViewSiteLink = () => (
  <a
    href="/"
    target="_blank"
    rel="noopener noreferrer"
    style={{ display: 'block', padding: '8px 0', color: '#2a8e9e', fontWeight: 500, textDecoration: 'none' }}
  >
    Lihat website ↗
  </a>
)
