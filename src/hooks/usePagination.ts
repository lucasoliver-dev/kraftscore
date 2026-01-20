'use client'

import { useEffect, useMemo, useState } from 'react'

type UsePaginationOptions = {
  pageSize?: number
  initialPage?: number
}

export type PaginationResult<T> = {
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
  items: T[]
  canGoPrev: boolean
  canGoNext: boolean
  setPage: (page: number) => void
  next: () => void
  prev: () => void
  reset: () => void
}

export const usePagination = <T,>(
  data: T[],
  options: UsePaginationOptions = {}
): PaginationResult<T> => {
  const pageSize = options.pageSize ?? 20
  const initialPage = options.initialPage ?? 1

  const [page, setPageState] = useState(initialPage)

  const totalItems = data.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))

  // ✅ garante que a page nunca fique inválida quando mudar a lista
  useEffect(() => {
    if (page > totalPages) setPageState(totalPages)
  }, [page, totalPages])

  const items = useMemo(() => {
    const start = (page - 1) * pageSize
    const end = start + pageSize
    return data.slice(start, end)
  }, [data, page, pageSize])

  const setPage = (newPage: number) => {
    const safe = Math.min(Math.max(1, newPage), totalPages)
    setPageState(safe)
  }

  const next = () => setPage(page + 1)
  const prev = () => setPage(page - 1)
  const reset = () => setPageState(1)

  return {
    page,
    pageSize,
    totalItems,
    totalPages,
    items,
    canGoPrev: page > 1,
    canGoNext: page < totalPages,
    setPage,
    next,
    prev,
    reset,
  }
}
