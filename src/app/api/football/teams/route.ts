import { NextRequest, NextResponse } from 'next/server'
import { apiFootballFetchJson } from '@/app/api/football/_lib'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams

    // Evita bater /teams sem filtro nenhum (pode ser pesado e alguns planos limitam)
    const hasAnyFilter =
      params.has('search') ||
      params.has('league') ||
      params.has('season') ||
      params.has('country') ||
      params.has('id') ||
      params.has('code') ||
      params.has('name')

    if (!hasAnyFilter) {
      return NextResponse.json(
        {
          error:
            'Informe ao menos um filtro (ex: search, league+season, country, id).',
        },
        { status: 400 }
      )
    }

    return apiFootballFetchJson('/teams', params, 'revalidate-86400')
  } catch (error: unknown) {
    console.error('[teams] error:', error)

    return NextResponse.json(
      { error: 'Erro interno ao buscar teams.' },
      { status: 500 }
    )
  }
}
