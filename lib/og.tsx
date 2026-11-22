// Generated Open Graph cards (1200×630) for articles, case studies, service and local
// pages: the shared look used by the opengraph-image.tsx route files.
import { ImageResponse } from "next/og"

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_TYPE = "image/png"

const INK = "#0b1220"
const BRAND = "#2a8e9e"
const BG = "#f7f9fb"

/** Long titles get a smaller type size so they never overflow the card. */
const titleSize = (title: string) => (title.length > 90 ? 52 : title.length > 60 ? 60 : 72)

export function ogCard({ kicker, title, footer }: { kicker: string; title: string; footer?: string }) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: BG, padding: "72px 80px", position: "relative" }}>
        {/* Soft brand glow in the corner */}
        <div style={{ position: "absolute", right: -160, top: -160, width: 520, height: 520, borderRadius: 9999, background: "radial-gradient(circle, rgba(42,142,158,0.22), rgba(42,142,158,0))", display: "flex" }} />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: 9999, background: INK, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontStyle: "italic" }}>Y</div>
          <div style={{ fontSize: 30, fontWeight: 700, color: INK, letterSpacing: -0.5, display: "flex" }}>YMS Studio</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 1000 }}>
          <div style={{ fontSize: 24, fontWeight: 600, color: BRAND, textTransform: "uppercase", letterSpacing: 4, display: "flex" }}>{kicker}</div>
          <div style={{ fontSize: titleSize(title), fontWeight: 700, color: INK, lineHeight: 1.1, letterSpacing: -2, display: "flex" }}>{title}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 24, color: "rgba(11,18,32,0.55)" }}>
          <div style={{ display: "flex" }}>{footer ?? ""}</div>
          <div style={{ display: "flex", color: INK, fontWeight: 600 }}>ymsstudio.id</div>
        </div>
        <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: 10, background: BRAND, display: "flex" }} />
      </div>
    ),
    OG_SIZE,
  )
}
