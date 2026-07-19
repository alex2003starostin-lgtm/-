import { allSearchableForms } from '../data/catalog'

export interface SearchHit {
  formId: string
  title: string
  departmentTitle: string
  departmentId: string
  categoryTitle?: string
  description: string
  disabled?: boolean
  score: number
}

function normalize(value: string): string {
  return value.toLowerCase().replace(/ё/g, 'е').trim()
}

function words(value: string): string[] {
  return value.split(/[^a-zа-я0-9]+/i).filter(Boolean)
}

/** Grubby stemming for Russian case endings: compare word prefixes so "визу" matches "виза". */
function stem(word: string): string {
  if (word.length <= 3) return word
  if (word.length === 4) return word.slice(0, 3)
  return word.slice(0, 4)
}

function hasWordStemMatch(queryWords: string[], textWords: string[]): boolean {
  return queryWords.some((qw) => {
    if (qw.length < 3) return textWords.includes(qw)
    const qStem = stem(qw)
    return textWords.some((tw) => tw.length >= 3 && stem(tw) === qStem)
  })
}

export function searchForms(query: string, limit = 8): SearchHit[] {
  const q = normalize(query)
  if (!q) return []
  const qWords = words(q)

  const hits: SearchHit[] = []
  for (const { form, department, category } of allSearchableForms()) {
    const title = normalize(form.title)
    const dept = normalize(department.title)
    const cat = category ? normalize(category.title) : ''
    const description = normalize(form.description)

    let score = -1
    if (title.startsWith(q)) score = 100
    else if (title.includes(q)) score = 80
    else if (hasWordStemMatch(qWords, words(title))) score = 65
    else if (cat.includes(q) || hasWordStemMatch(qWords, words(cat))) score = 55
    else if (dept.includes(q) || hasWordStemMatch(qWords, words(dept))) score = 45
    else if (description.includes(q) || hasWordStemMatch(qWords, words(description))) score = 30

    if (score < 0) continue

    hits.push({
      formId: form.id,
      title: form.title,
      departmentTitle: department.title,
      departmentId: department.id,
      categoryTitle: category?.title,
      description: form.description,
      disabled: form.disabled,
      score,
    })
  }

  return hits.sort((a, b) => b.score - a.score).slice(0, limit)
}
