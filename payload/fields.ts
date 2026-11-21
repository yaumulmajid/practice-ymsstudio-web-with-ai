import type { ArrayField, Field, FieldHook, NumberField, RichTextField, TextareaField, TextField } from 'payload'

/* ------------------------------------------------------------------ bilingual */

/** Suffix of the English twin of a bilingual field: `title` (ID) + `titleEn` (EN). */
export const EN_SUFFIX = 'En'

type BilingualInput =
  | (Omit<TextField, 'hasMany' | 'maxRows' | 'minRows'> & { hasMany?: false })
  | TextareaField
  | RichTextField

const titleCase = (name: string) => name.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())

/**
 * One text field in both languages, side by side (no locale switching) — same
 * pattern as the Woodnest CMS. Indonesian keeps the field's name and rules; the
 * English twin (`<name>En`) is optional and the website falls back to Indonesian.
 */
export function bilingual(field: BilingualInput): Field[] {
  const base = typeof field.label === 'string' ? field.label : titleCase(field.name)
  const admin = field.admin ?? {}
  const { description, width: _width, ...restAdmin } = admin as typeof admin & { width?: string }

  const id = { ...field, label: `${base} · ID`, admin: { ...restAdmin, description } } as Field
  const en = {
    ...field,
    name: `${field.name}${EN_SUFFIX}`,
    label: `${base} · EN`,
    required: false,
    validate: undefined,
    defaultValue: undefined,
    admin: {
      ...restAdmin,
      ...(field.type !== 'richText' ? { placeholder: 'Kosongkan untuk memakai teks Indonesia' } : {}),
      description: field.type === 'richText' ? 'Kosongkan bila artikel belum ada versi Inggris.' : undefined,
    },
  } as Field

  if (field.type === 'richText') return [id, en]
  return [
    {
      type: 'row',
      fields: [
        { ...id, admin: { ...(id.admin ?? {}), width: '50%' } } as Field,
        { ...en, admin: { ...(en.admin ?? {}), width: '50%' } } as Field,
      ],
    },
  ]
}

/** Shorthands used by the page globals. */
export const t = (name: string, label: string, description?: string) =>
  bilingual({ name, label, type: 'text', admin: description ? { description } : undefined })
export const ta = (name: string, label: string, description?: string) =>
  bilingual({ name, label, type: 'textarea', admin: description ? { description } : undefined })

/** A list of short bilingual texts (e.g. rotating words, features). Rows hold `text` / `textEn`. */
export const textList = (name: string, label: string, itemLabel = 'Teks'): ArrayField => ({
  name,
  label,
  type: 'array',
  labels: { singular: itemLabel, plural: label },
  admin: { initCollapsed: true },
  fields: t('text', itemLabel),
})

/** Small heading block used by most sections: label + title + highlighted title part. */
export const headingFields = (): Field[] => [
  ...t('label', 'Label kecil', "Teks kecil di atas judul, mis. 'Layanan'"),
  ...t('titleA', 'Judul'),
  ...t('titleEm', 'Judul (miring berwarna)'),
]

/* ----------------------------------------------------------------------- slug */

export function slugify(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** URL slug generated from `sourceField` (Indonesian) when left empty. Shared by both languages. */
export const slugField = (sourceField = 'title'): Field => {
  const formatSlug: FieldHook = ({ value, data, originalDoc }) => {
    if (typeof value === 'string' && value.trim()) return slugify(value)
    const source = data?.[sourceField] ?? originalDoc?.[sourceField]
    return typeof source === 'string' && source.trim() ? slugify(source) : value
  }
  return {
    name: 'slug',
    label: 'URL (slug)',
    type: 'text',
    unique: true,
    index: true,
    admin: {
      position: 'sidebar',
      description: 'Dibuat otomatis dari judul. Dipakai untuk versi ID dan EN.',
    },
    hooks: { beforeValidate: [formatSlug] },
  }
}

/** Number field that orders lists (smaller first). */
export const sortOrderField: NumberField = {
  name: 'sortOrder',
  label: 'Urutan',
  type: 'number',
  defaultValue: 10,
  admin: { position: 'sidebar', description: 'Angka kecil tampil lebih dulu.' },
}
