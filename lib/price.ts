// Prices from the CMS tiers: "2jt", "3,5jt" (Indonesian) or "2M", "3.5M" (English), always in IDR.

/** IDR per US dollar for the approximate USD shown on English pages. Update when the rate drifts. */
export const IDR_PER_USD = 16_500

export function priceToNumber(price: string): number | undefined {
  const m = price.replace(/\s/g, "").match(/^([\d.,]+)(jt|juta|rb|ribu|m|k)?$/i)
  if (!m) return undefined
  const unit = m[2]?.toLowerCase()
  // Indonesian writes 3,5 / 1.500; English writes 3.5 / 1,500.
  const english = unit === "m" || unit === "k"
  const n = Number(english ? m[1].replace(/,/g, "") : m[1].replace(/\./g, "").replace(",", "."))
  if (!Number.isFinite(n)) return undefined
  const mult = unit === "m" || unit?.startsWith("j") ? 1_000_000 : unit === "k" || unit?.startsWith("r") ? 1_000 : 1
  return Math.round(n * mult)
}

/** "≈ US$120" for a CMS price, rounded to US$5; undefined when the price can't be read. */
export function usdApprox(price: string): string | undefined {
  const idr = priceToNumber(price)
  if (!idr) return undefined
  return `≈ US$${Math.round(idr / IDR_PER_USD / 5) * 5}`
}
