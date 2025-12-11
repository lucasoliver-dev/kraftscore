// src/components/Prediction/PredictionTextAnalysis.tsx
import ReactMarkdown from 'react-markdown'
import { Brain } from 'lucide-react'

export type PredictionTextAnalysisProps = {
  markdown: string
}

/**
 * Renders the detailed textual analysis section using markdown.
 */
const PredictionTextAnalysis = ({ markdown }: PredictionTextAnalysisProps) => (
  <section className="space-y-3">
    <div className="flex items-center gap-2">
      <Brain className="h-4 w-4 text-orange-400" />
      <h3 className="text-sm font-semibold text-zinc-100">
        Detalhes da análise
      </h3>
    </div>

    <ReactMarkdown
      components={{
        h3: ({ children }) => (
          <h3 className="mt-3 text-sm font-semibold text-zinc-100">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="text-sm leading-relaxed text-zinc-300">{children}</p>
        ),
        li: ({ children }) => (
          <li className="text-sm leading-relaxed text-zinc-300">{children}</li>
        ),
        strong: ({ children }) => (
          <span className="font-semibold text-zinc-100">{children}</span>
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  </section>
)

export default PredictionTextAnalysis
