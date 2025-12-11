// src/components/Prediction/PredictionPerformance.tsx
import { Flame, LineChart, Shield, TrendingUp } from 'lucide-react'
import type { MatchStatsSummary } from './prediction-utils'
import React from 'react'

export type PredictionPerformanceProps = {
  stats: MatchStatsSummary
  teamAway: string
  teamHome: string
}

/**
 * Renders attack, defense and form bars for home and away teams.
 */
const PredictionPerformance = ({
  stats,
  teamAway,
  teamHome,
}: PredictionPerformanceProps) => {
  const { home, away } = stats

  if (!home && !away) return null

  return (
    <section className="space-y-4 rounded-md border border-zinc-700 bg-zinc-900/60 p-4">
      <div className="mb-1 flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-orange-400" />
        <h3 className="text-sm font-semibold text-zinc-100">
          Performance dos times (0 a 100)
        </h3>
      </div>

      <p className="text-xs text-zinc-400">
        Barras representam força de ataque, defesa e forma recente em uma escala
        simples de 0 a 100, com base na análise da IA.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {home && (
          <div className="space-y-3 rounded-md border border-zinc-700 bg-zinc-950/60 p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase text-zinc-500">Time da casa</p>
                <p className="text-sm font-semibold text-zinc-100">
                  {teamHome}
                </p>
              </div>
            </div>

            <StatBar
              icon={<Flame className="h-3 w-3 text-orange-400" />}
              label="Ataque"
              value={home.attack}
              barClassName="bg-orange-500"
            />

            <StatBar
              icon={<Shield className="h-3 w-3 text-sky-400" />}
              label="Defesa"
              value={home.defense}
              barClassName="bg-sky-500"
            />

            <StatBar
              icon={<LineChart className="h-3 w-3 text-amber-400" />}
              label="Forma recente"
              value={home.form}
              barClassName="bg-amber-400"
            />
          </div>
        )}

        {away && (
          <div className="space-y-3 rounded-md border border-zinc-700 bg-zinc-950/60 p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase text-zinc-500">
                  Time visitante
                </p>
                <p className="text-sm font-semibold text-zinc-100">
                  {teamAway}
                </p>
              </div>
            </div>

            <StatBar
              icon={<Flame className="h-3 w-3 text-orange-400" />}
              label="Ataque"
              value={away.attack}
              barClassName="bg-orange-500"
            />

            <StatBar
              icon={<Shield className="h-3 w-3 text-sky-400" />}
              label="Defesa"
              value={away.defense}
              barClassName="bg-sky-500"
            />

            <StatBar
              icon={<LineChart className="h-3 w-3 text-amber-400" />}
              label="Forma recente"
              value={away.form}
              barClassName="bg-amber-400"
            />
          </div>
        )}
      </div>
    </section>
  )
}

type StatBarProps = {
  barClassName: string
  icon: React.ReactNode
  label: string
  value: number
}

/**
 * Small reusable stat bar component used in the performance section.
 */
const StatBar = ({ barClassName, icon, label, value }: StatBarProps) => (
  <div className="space-y-1">
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center gap-1">
        {icon}
        <span>{label}</span>
      </div>
      <span className="text-[11px] text-zinc-400">{value}/100</span>
    </div>
    <div className="h-2 w-full rounded-full bg-zinc-800">
      <div
        className={`h-2 rounded-full ${barClassName}`}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
)

export default PredictionPerformance
