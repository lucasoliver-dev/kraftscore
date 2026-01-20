'use client'

import Modal from '@/components/shared/Modal'
import PredictionView from '@/components/Prediction/PredictionView'
import { LoadingState } from '@/components/ui/states'

export type FixturePredictionModalState = {
  date: string
  leagueCountry: string
  leagueName: string
  teamAway: string
  teamAwayLogo: string
  teamHome: string
  teamHomeLogo: string
} | null

export type FixturePredictionModalProps = {
  isOpen: boolean
  selected: FixturePredictionModalState
  prediction: string | null
  isLoadingPrediction: boolean
  onClose: () => void
}

const FixturePredictionModal = ({
  isOpen,
  selected,
  prediction,
  isLoadingPrediction,
  onClose,
}: FixturePredictionModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {isLoadingPrediction ? (
        <LoadingState title="Gerando análise com IA..." />
      ) : (
        <PredictionView
          date={selected?.date ?? ''}
          leagueCountry={selected?.leagueCountry ?? ''}
          leagueName={selected?.leagueName ?? ''}
          prediction={prediction ?? ''} // ✅ resolve o TS
          teamAway={selected?.teamAway ?? ''}
          teamAwayLogo={selected?.teamAwayLogo ?? ''}
          teamHome={selected?.teamHome ?? ''}
          teamHomeLogo={selected?.teamHomeLogo ?? ''}
        />
      )}
    </Modal>
  )
}

export default FixturePredictionModal
