// src/components/Prediction/PredictionScoreGuess.tsx
import Image from 'next/image'
import { Target } from 'lucide-react'
import type { ScoreGuess } from './prediction-utils'
import { getInitials } from './prediction-utils'

export type PredictionScoreGuessProps = {
  guess: ScoreGuess
  teamAway: string
  teamAwayLogo?: string
  teamHome: string
  teamHomeLogo?: string
}

/**
 * Renders the final score guess section with team logos.
 */
const PredictionScoreGuess = ({
  guess,
  teamAway,
  teamAwayLogo,
  teamHome,
  teamHomeLogo,
}: PredictionScoreGuessProps) => (
  <section className="space-y-4 rounded-md border border-orange-500/50 bg-zinc-950/80 p-4">
    <div className="mb-1 flex items-center gap-2">
      <Target className="h-4 w-4 text-orange-400" />
      <h3 className="text-sm font-semibold text-zinc-100">
        Palpite de placar da IA
      </h3>
    </div>

    <div className="flex items-center justify-center gap-6">
      <TeamLogoBlock name={teamHome} logo={teamHomeLogo} />

      <div className="flex flex-col items-center gap-2">
        <span className="whitespace-nowrap text-[10px] uppercase tracking-wide text-zinc-500">
          Placar sugerido
        </span>
        <div className="rounded-md border border-orange-500/60 bg-zinc-900 px-4 py-2 text-2xl font-semibold text-orange-400">
          {guess.homeGoals} <span className="text-zinc-500">x</span>{' '}
          {guess.awayGoals}
        </div>
      </div>

      <TeamLogoBlock name={teamAway} logo={teamAwayLogo} />
    </div>

    <p className="text-[10px] text-zinc-500">
      Este palpite de placar é derivado da análise geral da IA (favorito,
      tendência de gols e forma recente). Use sempre em conjunto com a sua
      própria leitura de jogo e gestão de banca.
    </p>
  </section>
)

type TeamLogoBlockProps = {
  logo?: string
  name: string
}

/**
 * Renders a small circular logo or initials for a team.
 */
const TeamLogoBlock = ({ logo, name }: TeamLogoBlockProps) => (
  <div className="flex flex-col items-center gap-2">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800">
      {logo ? (
        <Image
          alt={`${name} logo`}
          src={logo}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-contain"
        />
      ) : (
        <span className="text-sm font-semibold text-orange-300">
          {getInitials(name)}
        </span>
      )}
    </div>
    <span className="max-w-[100px] text-center text-xs text-zinc-200">
      {name}
    </span>
  </div>
)

export default PredictionScoreGuess
