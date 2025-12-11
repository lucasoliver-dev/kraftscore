// src/components/Prediction/PredictionMarkets.tsx
import ReactMarkdown from 'react-markdown'
import { LineChart, Target } from 'lucide-react'

export type PredictionMarketsProps = {
  markdown: string
}

/**
 * Renders the betting suggestions section (Previsões) using markdown.
 */
const PredictionMarkets = ({ markdown }: PredictionMarketsProps) => (
  <section className="space-y-3 rounded-md border border-zinc-700 bg-zinc-900/60 p-4">
    <div className="mb-2 flex items-center gap-2">
      <LineChart className="h-4 w-4 text-orange-400" />
      <h3 className="text-sm font-semibold text-zinc-100">
        Sugestões de mercado
      </h3>
    </div>

    <ReactMarkdown
      components={{
        h3: ({ children }) => (
          <h3 className="mt-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="text-sm leading-relaxed text-zinc-300">
            {children}
          </p>
        ),
        li: ({ children }) => (
          <li className="flex items-start gap-2 text-sm leading-relaxed text-zinc-300">
            <Target className="mt-1 h-3 w-3 flex-shrink-0 text-orange-400" />
            <span>{children}</span>
          </li>
        ),
        strong: ({ children }) => (
          <span className="font-semibold text-zinc-100">
            {children}
          </span>
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  </section>
)

export default PredictionMarkets
