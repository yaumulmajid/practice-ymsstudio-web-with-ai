import { expect, test } from "@playwright/test"
import { pui } from "@/lib/pages-ui"

const id = pui.id

// Most tests start with cookies already accepted so the banner doesn't cover the page.
test.beforeEach(async ({ context, baseURL }) => {
  await context.addCookies([{ name: "yms_consent", value: "v1.a1.m1", url: baseURL! }])
})

test.describe("cookie consent", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies()
  })

  const consentState = (page: import("@playwright/test").Page) =>
    page.evaluate(() => {
      const updates = ((window as unknown as { dataLayer: IArguments[] }).dataLayer || []).filter((a) => a[0] === "consent").map((a) => [a[1], a[2]])
      return updates[updates.length - 1] as [string, Record<string, string>]
    })

  test("Google tags start denied and the banner records a rejection", async ({ page }) => {
    const c = id.cookie
    await page.goto("/")
    const banner = page.getByTestId("cookie-banner")
    await expect(banner).toBeVisible()
    expect((await consentState(page))[1].ad_storage).toBe("denied")

    await banner.getByRole("button", { name: c.reject }).click()
    await expect(banner).toBeHidden()
    const [, state] = await consentState(page)
    expect(state.analytics_storage).toBe("denied")
    expect(await page.evaluate(() => document.cookie)).toContain("yms_consent=v1.a0.m0")

    await page.reload()
    await expect(page.getByTestId("cookie-banner")).toBeHidden()
  })

  test("custom choice from the footer link is applied on the next visit", async ({ page }) => {
    const c = id.cookie
    await page.goto("/kontak")
    await page.getByTestId("cookie-banner").getByRole("button", { name: c.accept }).click()
    expect((await consentState(page))[1].ad_storage).toBe("granted")

    await page.getByRole("button", { name: id.footer.cookies }).click()
    const banner = page.getByTestId("cookie-banner")
    await banner.getByText(c.marketing, { exact: true }).click()
    await banner.getByRole("button", { name: c.save }).click()
    expect(await page.evaluate(() => document.cookie)).toContain("yms_consent=v1.a1.m0")

    await page.reload()
    const [, state] = await consentState(page)
    expect(state.analytics_storage).toBe("granted")
    expect(state.ad_storage).toBe("denied")
  })

  test("no visit source is stored without analytics consent", async ({ page }) => {
    await page.goto("/?utm_source=playwright")
    await page.getByTestId("cookie-banner").getByRole("button", { name: id.cookie.reject }).click()
    expect(await page.evaluate(() => localStorage.getItem("yms_attribution"))).toBeNull()
  })
})

test.describe("pages", () => {
  test("home loads in both languages and the language switch works", async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("html")).toHaveAttribute("lang", "id")
    await expect(page.locator("h1").first()).toBeVisible()

    await page.goto("/en")
    await expect(page.locator("html")).toHaveAttribute("lang", "en")
    await page.getByRole("group", { name: "Language" }).first().getByRole("link", { name: "id" }).click()
    await expect(page).toHaveURL(/\/$/)
    await expect(page.locator("html")).toHaveAttribute("lang", "id")
  })

  for (const city of ["cikarang", "bekasi", "jakarta", "karawang", "depok"]) {
    test(`local page for ${city}`, async ({ page }) => {
      const res = await page.goto(`/jasa-website-${city}`)
      expect(res?.status()).toBe(200)
      await expect(page.locator("h1")).toContainText(city.replace(/^./, (c) => c.toUpperCase()))
      const ld = await page.locator('script[type="application/ld+json"]').allTextContents()
      expect(ld.some((s) => s.includes('"areaServed"') && s.toLowerCase().includes(city))).toBe(true)
    })
  }

  test("unknown page returns 404", async ({ page }) => {
    const res = await page.goto("/halaman-yang-tidak-ada")
    expect(res?.status()).toBe(404)
  })
})

test.describe("calculator → brief", () => {
  test("answers carry over into the brief form", async ({ page }) => {
    const c = id.calc
    await page.goto("/kalkulator-biaya")
    await page.getByRole("button", { name: c.types.profile }).click()
    await page.getByRole("button", { name: c.pages.few }).click()
    await page.getByRole("button", { name: c.features.blog }).click()
    await page.getByRole("button", { name: c.next }).click()
    await page.getByRole("button", { name: c.timelines.normal }).click()

    await page.getByRole("link", { name: c.sendBrief }).click()
    await expect(page).toHaveURL(/\/kontak\?/)
    const box = page.getByTestId("brief-estimate")
    await expect(box).toContainText(c.types.profile)
    await expect(box).toContainText(c.pages.few)
    await expect(page.locator("#bf-service")).toHaveValue(/Company Profile/i)
    await expect(page.locator('input[name="estimate"]')).toHaveValue(new RegExp(c.timelines.normal))
  })
})

test.describe("brief form", () => {
  test("validates the phone number before sending", async ({ page }) => {
    const b = id.brief
    await page.goto("/kontak")
    await page.locator("#bf-name").fill("Tes Playwright")
    await page.locator("#bf-wa").fill("0812")
    await page.getByRole("button", { name: b.submit }).click()
    await expect(page.locator("form").getByRole("alert")).toHaveText(b.errPhone)
  })

  test("accepts emails that contain the letter s", async ({ page }) => {
    const b = id.brief
    await page.goto("/kontak")
    await page.locator("#bf-name").fill("Tes Playwright")
    await page.locator("#bf-wa").fill("0812")
    await page.locator("#bf-email").fill("sales@usaha.co.id")
    await page.getByRole("button", { name: b.submit }).click()
    // The phone error (not the email error) proves the email passed validation.
    await expect(page.locator("form").getByRole("alert")).toHaveText(b.errPhone)
  })

  test("sends a brief with the visit source", async ({ page }) => {
    test.skip(process.env.E2E_WRITE !== "1", "writes a lead; set E2E_WRITE=1")
    const b = id.brief
    await page.goto("/?utm_source=playwright&utm_medium=test&utm_campaign=e2e")
    await page.goto("/kontak")
    await page.locator("#bf-name").fill("Tes Playwright")
    await page.locator("#bf-wa").fill("081234567890")
    await page.locator("#bf-email").fill("sales@usaha.co.id")
    await expect(page.locator('input[name="attribution"]')).toHaveValue(/playwright/)
    await page.waitForTimeout(2600) // the form ignores submissions faster than a person could type
    await page.getByRole("button", { name: b.submit }).click()
    await expect(page.getByRole("heading", { name: b.okTitle })).toBeVisible()
  })
})

test.describe("SEO endpoints", () => {
  test("robots.txt has one rule set that blocks the CMS", async ({ request }) => {
    const body = await (await request.get("/robots.txt")).text()
    expect(body).toMatch(/Disallow: \/admin/)
    expect(body).toMatch(/Disallow: \/api\//)
    expect(body).not.toMatch(/User-Agent: Googlebot/i)
    expect(body).toMatch(/Sitemap: https:\/\/ymsstudio\.id\/sitemap\.xml/)
  })

  test("sitemap lists the local pages", async ({ request }) => {
    const body = await (await request.get("/sitemap.xml")).text()
    for (const city of ["cikarang", "bekasi", "jakarta", "karawang", "depok"]) expect(body).toContain(`/jasa-website-${city}`)
  })

  test("RSS feeds and the generated article image", async ({ request }) => {
    const res = await request.get("/blog/feed.xml")
    expect(res.status()).toBe(200)
    expect(res.headers()["content-type"]).toContain("application/rss+xml")
    const xml = await res.text()
    expect(xml).toContain("<rss")
    const first = xml.match(/<link>https:\/\/ymsstudio\.id(\/blog\/[^<]+)<\/link>/)?.[1]
    expect(first, "feed has at least one article").toBeTruthy()

    const en = await request.get("/en/blog/feed.xml")
    expect(en.status()).toBe(200)
    expect(await en.text()).toContain("<language>en-US</language>")

    const html = await (await request.get(first!)).text()
    const og = html.match(/<meta property="og:image" content="https:\/\/ymsstudio\.id([^"]+)"/)?.[1]
    expect(og, "article has og:image").toMatch(/opengraph-image/)
    const img = await request.get(og!.replace(/&amp;/g, "&"))
    expect(img.status()).toBe(200)
    expect(img.headers()["content-type"]).toContain("image/png")
  })
})
