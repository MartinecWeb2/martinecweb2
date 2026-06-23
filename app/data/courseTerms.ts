/**
 * Termíny kurzů skupiny B – upravujte enrolled (obsazeno) a capacity (kapacita).
 * startDate ve formátu YYYY-MM-DD.
 * Nastavte SHOW_COURSE_TERMS na true, až budete chtít sekci zobrazit na webu.
 */
export const SHOW_COURSE_TERMS = false
export interface CourseTerm {
  startDate: string
  capacity: number
  enrolled: number
  note?: string
}

export const courseTermsByBranch: Record<string, CourseTerm[]> = {
  bystrice: [
    {
      startDate: '2026-07-07',
      capacity: 12,
      enrolled: 11,
      note: 'Letní termín',
    },
    {
      startDate: '2026-08-04',
      capacity: 12,
      enrolled: 12,
    },
    {
      startDate: '2026-09-01',
      capacity: 12,
      enrolled: 6,
      note: 'Podzimní termín',
    },
  ],
  prerov: [
    {
      startDate: '2026-07-14',
      capacity: 14,
      enrolled: 14,
      note: 'Kapacita naplněna',
    },
    {
      startDate: '2026-08-11',
      capacity: 14,
      enrolled: 12,
    },
    {
      startDate: '2026-09-08',
      capacity: 14,
      enrolled: 4,
      note: 'Volná místa',
    },
  ],
}

export type TermAvailability = 'open' | 'low' | 'full'

export function getTermAvailability(term: CourseTerm) {
  const available = Math.max(0, term.capacity - term.enrolled)
  const fillPercent = term.capacity > 0 ? Math.round((term.enrolled / term.capacity) * 100) : 100

  let status: TermAvailability = 'open'
  if (available === 0) status = 'full'
  else if (available <= 2) status = 'low'

  return { available, fillPercent, status }
}

export function formatTermDate(isoDate: string) {
  const date = new Date(`${isoDate}T12:00:00`)
  return date.toLocaleDateString('cs-CZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatTermWeekday(isoDate: string) {
  const date = new Date(`${isoDate}T12:00:00`)
  return date.toLocaleDateString('cs-CZ', { weekday: 'long' })
}
