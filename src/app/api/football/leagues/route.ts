import { NextRequest, NextResponse } from 'next/server'
import { apiFootballFetchJson } from '@/app/api/football/_lib'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams

    // Evita chamar /leagues sem filtro (pesado)
    const hasAnyFilter =
      params.has('search') ||
      params.has('country') ||
      params.has('code') ||
      params.has('id') ||
      params.has('season') ||
      params.has('type')

    if (!hasAnyFilter) {
      return NextResponse.json(
        {
          error:
            'Informe ao menos um filtro (ex: search, country, season, id).',
        },
        { status: 400 }
      )
    }

    return apiFootballFetchJson('/leagues', params, 'revalidate-86400')
  } catch (error: unknown) {
    console.error('[leagues] error:', error)

    return NextResponse.json(
      { error: 'Erro interno ao buscar leagues.' },
      { status: 500 }
    )
  }
}
