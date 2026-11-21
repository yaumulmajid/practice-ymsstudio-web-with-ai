"use client"

import { createContext, useContext, type ReactNode } from "react"
import { dictionaries, type Dict, type Lang } from "@/lib/i18n"
import { projects } from "@/lib/site-data"

const LangContext = createContext<Lang>("id")

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>
}

export function useLang(): Lang {
  return useContext(LangContext)
}

export function useT(): Dict {
  return dictionaries[useContext(LangContext)]
}

/** Projects merged with their localized title/category/description. */
export function useProjects() {
  const t = useT()
  return projects.map((p, i) => ({ ...p, ...t.work.projects[i] }))
}
