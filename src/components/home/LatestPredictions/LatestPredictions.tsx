import List from '@/components/layout/list/List'
import styles from './latest-predictions.module.scss'
import { HomePanel } from '@/components/home/HomePanel/HomePanel'

type PredictionCardProps = {
  title: string
  pick: string
  confidence: string
}

function PredictionCard({ title, pick, confidence }: PredictionCardProps) {
  return (
    <div className={styles.rowCard}>
      <div className={styles.rowLeft}>
        <p className={styles.rowTitle}>{title}</p>
        <p className={styles.rowMeta}>{pick}</p>
      </div>

      <span className={styles.confidencePill}>{confidence}</span>
    </div>
  )
}

export function LatestPredictions() {
  return (
    <HomePanel
      title="Últimas previsões"
      subtitle="Seu histórico recente (mock por enquanto)."
      actionHref="/predictions"
      actionLabel="Abrir histórico →"
    >
      <List scroll fade maxHeight={420} gap="md">
        <PredictionCard title="Barcelona x Real Madrid" pick="Over 2.5" confidence="78%" />
        <PredictionCard title="PSG x Marseille" pick="BTTS" confidence="64%" />
        <PredictionCard title="Palmeiras x Corinthians" pick="Casa vence" confidence="59%" />
      </List>
    </HomePanel>
  )
}
