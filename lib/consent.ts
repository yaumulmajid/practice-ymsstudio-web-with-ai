// Cookie consent: the visitor's choice lives in a first-party cookie ("yms_consent") and
// is passed to Google Consent Mode v2. Until a choice is made, Google tags run in
// "denied" mode (no cookies, only anonymous pings), see consentDefaultScript.

export type Consent = { analytics: boolean; marketing: boolean }

export const CONSENT_COOKIE = "yms_consent"
/** Fired on window after the visitor saves a choice (detail: Consent). */
export const CONSENT_EVENT = "yms:consent"
/** Fired to reopen the banner (footer "Cookie settings" link). */
export const CONSENT_OPEN_EVENT = "yms:consent-open"

const MAX_AGE = 60 * 60 * 24 * 180 // 6 months, then ask again
const PATTERN = /(?:^|;\s*)yms_consent=v1\.a([01])\.m([01])/

export function readConsent(): Consent | null {
  if (typeof document === "undefined") return null
  const m = document.cookie.match(PATTERN)
  return m ? { analytics: m[1] === "1", marketing: m[2] === "1" } : null
}

export function saveConsent(c: Consent) {
  const secure = location.protocol === "https:" ? "; Secure" : ""
  document.cookie = `${CONSENT_COOKIE}=v1.a${c.analytics ? 1 : 0}.m${c.marketing ? 1 : 0}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
  gtag?.("consent", "update", consentState(c))
  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_EVENT, { detail: c }))
}

export const openConsentSettings = () => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))

const g = (on: boolean) => (on ? "granted" : "denied")

export function consentState(c: Consent) {
  return {
    analytics_storage: g(c.analytics),
    ad_storage: g(c.marketing),
    ad_user_data: g(c.marketing),
    ad_personalization: g(c.marketing),
  }
}

/**
 * Inline <head> script, before any Google tag: everything denied by default, then the
 * saved choice (if any) is applied straight away so returning visitors are measured
 * from the first hit.
 */
export const consentDefaultScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied', wait_for_update: 500 });
gtag('set', 'ads_data_redaction', true);
gtag('set', 'url_passthrough', true);
(function () {
  var m = document.cookie.match(${PATTERN.toString()});
  if (!m) return;
  var a = m[1] === '1' ? 'granted' : 'denied', k = m[2] === '1' ? 'granted' : 'denied';
  gtag('consent', 'update', { analytics_storage: a, ad_storage: k, ad_user_data: k, ad_personalization: k });
})();
`
