'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X } from 'lucide-react'
import type { BranchFeature, TeamMember, Vehicle } from '@/app/data/branches'

/** Dočasně vypnuté panely – karty zůstávají, bez hover/klik rozbalení */
const SHOW_FLEET_AND_TEAM_PANELS = false

function useCanHover() {
  const [canHover, setCanHover] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setCanHover(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return canHover
}

function FleetPanel({ vehicles }: { vehicles: Vehicle[] }) {
  if (vehicles.length === 0) {
    return (
      <div className="text-left">
        <p className="text-gray-600 text-sm leading-relaxed">
          Vozový park právě doplňujeme.
        </p>
        <p className="text-gray-400 text-xs mt-2">
          Brzy zde uvidíte naše výuková vozidla.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {vehicles.map((vehicle) => (
        <div key={vehicle.name} className="flex gap-3 items-center">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
            <Image
              src={vehicle.image}
              alt={vehicle.name}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 text-left">
            <p className="font-semibold text-apple-gray text-sm leading-tight">{vehicle.name}</p>
            <p className="text-gray-500 text-xs mt-0.5">{vehicle.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function TeamPanel({ members }: { members: TeamMember[] }) {
  return (
    <div className={members.length === 1 ? 'flex justify-center' : 'grid grid-cols-2 gap-3'}>
      {members.map((member) => (
        <div key={member.image} className="text-center max-w-[140px]">
          <div className="relative mx-auto w-16 h-16 rounded-full overflow-hidden mb-2">
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <p className="font-semibold text-apple-gray text-xs leading-tight">{member.name}</p>
          <p className="text-gray-500 text-[11px] mt-0.5">{member.role}</p>
        </div>
      ))}
    </div>
  )
}

function PanelContent({
  panel,
  vehicles,
  teamMembers,
}: {
  panel: 'fleet' | 'team'
  vehicles: Vehicle[]
  teamMembers: TeamMember[]
}) {
  if (panel === 'fleet') return <FleetPanel vehicles={vehicles} />
  return <TeamPanel members={teamMembers} />
}

function FeatureModal({
  feature,
  vehicles,
  teamMembers,
  onClose,
}: {
  feature: BranchFeature
  vehicles: Vehicle[]
  teamMembers: TeamMember[]
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="feature-modal-title"
      >
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <feature.icon className="w-6 h-6 text-accent" />
            </div>
            <h3 id="feature-modal-title" className="text-xl font-bold text-apple-gray">
              {feature.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-apple-gray hover:bg-gray-200 transition-colors"
            aria-label="Zavřít"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {feature.panel && (
          <PanelContent
            panel={feature.panel}
            vehicles={vehicles}
            teamMembers={teamMembers}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

function FeatureCard({
  feature,
  index,
  vehicles,
  teamMembers,
}: {
  feature: BranchFeature
  index: number
  vehicles: Vehicle[]
  teamMembers: TeamMember[]
}) {
  const canHover = useCanHover()
  const [hovered, setHovered] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const hasPanel = feature.panel === 'fleet' || feature.panel === 'team'
  const isExpandable =
    hasPanel && SHOW_FLEET_AND_TEAM_PANELS
  const showPanel = isExpandable && (canHover ? hovered : false)

  const handleClick = () => {
    if (isExpandable && !canHover) setModalOpen(true)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className={`relative bg-white rounded-3xl p-8 shadow-lg transition-shadow min-h-[260px] ${
          isExpandable
            ? 'cursor-pointer md:cursor-default hover:shadow-xl'
            : 'hover:shadow-xl'
        } ${showPanel ? 'shadow-xl ring-2 ring-accent/20' : ''}`}
        onMouseEnter={() => canHover && isExpandable && setHovered(true)}
        onMouseLeave={() => canHover && setHovered(false)}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (isExpandable && !canHover && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            setModalOpen(true)
          }
        }}
        role={isExpandable && !canHover ? 'button' : undefined}
        tabIndex={isExpandable && !canHover ? 0 : undefined}
        aria-expanded={isExpandable ? (canHover ? hovered : modalOpen) : undefined}
      >
        <div
          className={`transition-opacity duration-300 ${
            showPanel ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
            <feature.icon className="w-8 h-8 text-accent" />
          </div>
          <h3 className="text-2xl font-bold text-apple-gray mb-3">{feature.title}</h3>
          <p className="text-gray-600 font-light leading-relaxed">{feature.description}</p>
          {isExpandable && (
            <p className="mt-4 text-sm text-accent font-medium">
              {canHover ? 'Najeďte myší pro zobrazení' : 'Klepněte pro zobrazení'}
            </p>
          )}
        </div>

        <AnimatePresence>
          {showPanel && feature.panel && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 p-6 md:p-8 flex flex-col rounded-3xl bg-white"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-apple-gray mb-4">{feature.title}</h3>
              <div className="flex-1 overflow-y-auto">
                <PanelContent
                  panel={feature.panel}
                  vehicles={vehicles}
                  teamMembers={teamMembers}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {modalOpen && (
          <FeatureModal
            feature={feature}
            vehicles={vehicles}
            teamMembers={teamMembers}
            onClose={() => setModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default function FeatureCards({
  features,
  vehicles,
  teamMembers,
}: {
  features: BranchFeature[]
  vehicles: Vehicle[]
  teamMembers: TeamMember[]
}) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map((feature, index) => (
        <FeatureCard
          key={feature.title}
          feature={feature}
          index={index}
          vehicles={vehicles}
          teamMembers={teamMembers}
        />
      ))}
    </div>
  )
}
