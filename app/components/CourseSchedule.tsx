'use client'

import { motion } from 'framer-motion'
import { CalendarDays, Users, AlertCircle, CheckCircle2 } from 'lucide-react'
import {
  type CourseTerm,
  getTermAvailability,
  formatTermDate,
  formatTermWeekday,
} from '@/app/data/courseTerms'
import { PRIHLASKA_URL } from '@/app/data/branches'

const statusStyles = {
  open: {
    badge: 'bg-emerald-100 text-emerald-800',
    bar: 'bg-emerald-500',
    label: (n: number) => `${n} volných míst`,
  },
  low: {
    badge: 'bg-amber-100 text-amber-800',
    bar: 'bg-amber-500',
    label: (n: number) =>
      n === 1 ? 'Poslední volné místo!' : `Jen ${n} volná místa`,
  },
  full: {
    badge: 'bg-gray-200 text-gray-600',
    bar: 'bg-gray-400',
    label: () => 'Kapacita naplněna',
  },
} as const

function TermCard({ term, index }: { term: CourseTerm; index: number }) {
  const { available, fillPercent, status } = getTermAvailability(term)
  const styles = statusStyles[status]

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex flex-col rounded-3xl p-6 md:p-8 shadow-lg border ${
        status === 'full'
          ? 'bg-gray-50 border-gray-200 opacity-90'
          : status === 'low'
            ? 'bg-white border-amber-200 ring-1 ring-amber-100'
            : 'bg-white border-gray-100'
      }`}
    >
      {status === 'low' && (
        <div className="absolute -top-3 left-6 px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">
          Brzy obsazeno
        </div>
      )}

      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-500 capitalize mb-1">
            {formatTermWeekday(term.startDate)}
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-apple-gray tracking-tight">
            {formatTermDate(term.startDate)}
          </h3>
          {term.note && (
            <p className="text-sm text-gray-500 mt-2">{term.note}</p>
          )}
        </div>
        <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center flex-shrink-0">
          <CalendarDays className="w-6 h-6 text-accent" />
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="flex items-center gap-1.5 text-gray-600">
            <Users className="w-4 h-4" />
            {term.enrolled} / {term.capacity} míst obsazeno
          </span>
          <span className="font-medium text-apple-gray">{fillPercent} %</span>
        </div>
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${fillPercent}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
            className={`h-full rounded-full ${styles.bar}`}
          />
        </div>
      </div>

      <div className="mt-auto">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${styles.badge}`}
        >
          {status === 'full' ? (
            <AlertCircle className="w-4 h-4" />
          ) : (
            <CheckCircle2 className="w-4 h-4" />
          )}
          {styles.label(available)}
        </span>

        {status !== 'full' ? (
          <button
            type="button"
            onClick={() => window.open(PRIHLASKA_URL, '_blank')}
            className={`mt-5 w-full py-3 rounded-full font-semibold transition-colors text-sm md:text-base ${
              status === 'low'
                ? 'bg-amber-500 text-white hover:bg-amber-600'
                : 'bg-accent text-white hover:bg-blue-700'
            }`}
          >
            Rezervovat místo
          </button>
        ) : (
          <p className="mt-5 text-sm text-gray-500 text-center leading-relaxed">
            Tento termín je plný. Zkuste jiný termín nebo nás kontaktujte.
          </p>
        )}
      </div>
    </motion.article>
  )
}

export default function CourseSchedule({
  terms,
  branchName,
}: {
  terms: CourseTerm[]
  branchName: string
}) {
  if (terms.length === 0) return null

  const hasLowAvailability = terms.some((t) => {
    const { status } = getTermAvailability(t)
    return status === 'low' || status === 'full'
  })

  return (
    <section id="terminy" className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 bg-accent/10 text-accent rounded-full text-sm font-semibold">
            Skupina B
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-apple-gray mb-6 tracking-tight">
            Termíny kurzů
          </h2>
          <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
            Aktuální volná místa pro pobočku {branchName}. Kapacita je omezená —
            doporučujeme přihlásit se včas.
          </p>
        </motion.div>

        {hasLowAvailability && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 max-w-3xl mx-auto flex items-start gap-3 px-5 py-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm md:text-base leading-relaxed">
              O naše kurzy je velký zájem a kapacita se rychle plní. Některé
              termíny jsou již plné nebo mají poslední volná místa.
            </p>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {terms.map((term, index) => (
            <TermCard key={term.startDate} term={term} index={index} />
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 font-light mt-12 max-w-2xl mx-auto">
          Údaje o obsazenosti aktualizujeme průběžně. Po naplnění kapacity
          termín uzavíráme — v případě dotazů nás neváhejte kontaktovat.
        </p>
      </div>
    </section>
  )
}
