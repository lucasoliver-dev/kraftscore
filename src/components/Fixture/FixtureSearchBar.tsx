'use client'

import type React from 'react'
import { Input } from '@/components/ui/input'

export type FixtureSearchBarProps = {
  value: string
  hasQuery: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClear: () => void
}

const FixtureSearchBar = ({
  value,
  hasQuery,
  onChange,
  onClear,
}: FixtureSearchBarProps) => {
  return (
    <div className="mb-4 flex items-center gap-3">
      <Input
        value={value}
        variant="neon"
        onChange={onChange}
        placeholder="Pesquisar por time, liga ou país..."
      />

      {hasQuery && (
        <button
          type="button"
          className="h-11 rounded-md border border-input bg-background px-3 text-sm text-foreground transition hover:bg-accent"
          onClick={onClear}
        >
          Limpar
        </button>
      )}
    </div>
  )
}

export default FixtureSearchBar
