// src/components/Prediction/PredictionResultIndicators.tsx
import { LineChart } from 'lucide-react'

export type PredictionResultIndicatorsProps = {
  awayWinProb: number
  homeWinProb: number
  teamAway: string
  teamHome: string
}

/**
 * Renders the simple win probability bars for home and away teams.
 */
const PredictionResultIndicators = ({
  awayWinProb,
  homeWinProb,
  teamAway,
  teamHome,
}: PredictionResultIndicatorsProps) => {
  const homeIsFav = homeWinProb >= awayWinProb
  const awayIsFav = awayWinProb > homeWinProb

  return (
    <section className="space-y-3 rounded-md border border-zinc-700 bg-zinc-900/60 p-4">
      <div className="mb-1 flex items-center gap-2">
        <LineChart className="h-4 w-4 text-emerald-400" />
        <h3 className="text-sm font-semibold text-zinc-100">
          Indicadores de resultado
        </h3>
      </div>

      <p className="mb-2 text-xs text-zinc-400">
        Barras representam uma estimativa simples da chance de vitória
        baseada nas previsões da IA. Verde indica favorito, vermelho o
        lado menos provável.
      </p>

      <div className="space-y-4 text-xs">
        <TeamProbRow
          isFav={homeIsFav}
          label={teamHome}
          prob={homeWinProb}
          side="Casa"
        />

        <TeamProbRow
          isFav={awayIsFav}
          label={teamAway}
          prob={awayWinProb}
          side="Fora"
        />
      </div>
    </section>
  )
}

type TeamProbRowProps = {
  isFav: boolean
  label: string
  prob: number
  side: 'Casa' | 'Fora'
}

/**
 * Row with a label and probability bar.
 */
const TeamProbRow = ({
  isFav,
  label,
  prob,
  side,
}: TeamProbRowProps) => (
  <div className="space-y-1">
    <div className="flex items-center justify-between">
      <span className="font-semibold text-zinc-100">
        {label}{' '}
        <span className="text-[10px] uppercase text-zinc-500">
          ({side})
        </span>
      </span>
      <span className="text-[11px] text-zinc-400">
        {prob.toFixed(0)}%
      </span>
    </div>
    <div className="h-2 w-full rounded-full bg-zinc-800">
      <div
        className={`h-2 rounded-full ${
          isFav ? 'bg-emerald-500' : 'bg-red-500'
        }`}
        style={{ width: `${prob}%` }}
      />
    </div>
  </div>
)

export default PredictionResultIndicators
