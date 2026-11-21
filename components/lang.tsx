"use client"

import { createContext, useContext, type ReactNode } from "react"
import { waLink, type Lang } from "@/lib/i18n"
import type { SiteData } from "@/lib/content"

const SiteContext = createContext<SiteData | null>(null)

/** Provides the CMS content (loaded on the server) to client components. */
export function LangProvider({ site, children }: { site: SiteData; children: ReactNode }) {
  return <SiteContext.Provider value={site}>{children}</SiteContext.Provider>
}

function useSite(): SiteData {
  const site = useContext(SiteContext)
  if (!site) throw new Error("LangProvider is missing")
  return site
}

export const useLang = (): Lang => useSite().lang
export const useT = () => useSite().dict
export const useProjects = () => useSite().projects
export const useSettings = () => useSite().settings
export const useBlogSlugs = () => useSite().blogSlugs

/** Returns a function that builds a wa.me link with the configured number. */
export function useWa() {
  const { waNumber } = useSite().settings
  return (text: string) => waLink(waNumber, text)
}
