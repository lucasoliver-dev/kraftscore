'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

type PaginationProps = {
  page: number
  totalPages: number
  canGoPrev: boolean
  canGoNext: boolean
  onPrev: () => void
  onNext: () => void
  onGoToPage?: (page: number) => void
}

export const Pagination = ({
  page,
  totalPages,
  canGoPrev,
  canGoNext,
  onPrev,
  onNext,
}: PaginationProps) => {
  if (totalPages <= 1) return null

  return (
    <div className="mt-4 flex items-center justify-center gap-3">
      <Button
        type="button"
        variant="ghost"
        onClick={onPrev}
        disabled={!canGoPrev}
        className="gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        Anterior
      </Button>

      <div className="text-xs text-zinc-400">
        Página <span className="text-zinc-100">{page}</span> de{' '}
        <span className="text-zinc-100">{totalPages}</span>
      </div>

      <Button
        type="button"
        variant="ghost"
        onClick={onNext}
        disabled={!canGoNext}
        className="gap-1"
      >
        Próxima
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
