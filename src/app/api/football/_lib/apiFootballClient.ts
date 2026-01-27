import { NextResponse } from 'next/server'

const API_FOOTBALL_BASE_URL =
  process.env.API_FOOTBALL_BASE_URL ?? 'https://v3.football.api-sports.io'

const API_FOOTBALL_KEY = process.env.API_FOOTBALL_KEY ?? ''

type CacheMode =
  | 'no-store'
  | 'revalidate-60'
  | 'revalidate-300'
  | 'revalidate-3600'
  | 'revalidate-86400'

const cacheInit = (cacheMode: CacheMode): RequestInit => {
  if (cacheMode === 'no-store') return { cache: 'no-store' }

  const seconds = Number(cacheMode.split('-')[1])
  return { next: { revalidate: seconds } }
}

export const apiFootballFetchJson = async (
  path: string,
  params: URLSearchParams,
  cacheMode: CacheMode = 'no-store'
) => {
  if (!API_FOOTBALL_KEY) {
    return NextResponse.json(
      { error: 'API_FOOTBALL_KEY não configurada.' },
      { status: 500 }
    )
  }

  const url = `${API_FOOTBALL_BASE_URL}${path}?${params.toString()}`

  const response = await fetch(url, {
    headers: { 'x-apisports-key': API_FOOTBALL_KEY },
    ...cacheInit(cacheMode),
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Erro na API-Football', status: response.status, data },
      { status: response.status }
    )
  }

  return NextResponse.json(data)
}
