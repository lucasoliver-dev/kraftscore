// src/components/Prediction/PredictionHeader.tsx
import { Brain } from 'lucide-react'

export type PredictionHeaderProps = {
  date: string
  leagueCountry: string
  leagueName: string
  teamAway: string
  teamHome: string
}

/**
 * Renders the top summary of the match: teams, league, country and date.
 */
const PredictionHeader = ({
  date,
  leagueCountry,
  leagueName,
  teamAway,
  teamHome,
}: PredictionHeaderProps) => (
  <section className="rounded-md border border-zinc-700 bg-zinc-900/70 p-4">
    <div className="mb-2 flex items-center gap-3">
      <Brain className="h-5 w-5 text-orange-400" />
      <div className="text-sm">
        <p className="text-xs uppercase text-zinc-400">Análise da partida</p>
        <p className="text-sm font-semibold">
          {teamHome} x {teamAway}
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 gap-2 text-xs text-zinc-400 sm:grid-cols-3">
      <div>
        <span className="font-semibold text-zinc-100">Liga:</span> {leagueName}
      </div>
      <div>
        <span className="font-semibold text-zinc-100">País:</span>{' '}
        {leagueCountry}
      </div>
      <div>
        <span className="font-semibold text-zinc-100">Data:</span> {date}
      </div>
    </div>
  </section>
)

export default PredictionHeader
