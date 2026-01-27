import { NextRequest, NextResponse } from 'next/server'
import { apiFootballFetchJson } from '@/app/api/football/_lib'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const league = req.nextUrl.searchParams.get('league')
    const season = req.nextUrl.searchParams.get('season')

    if (!league) {
      return NextResponse.json(
        { error: 'Parâmetro obrigatório ausente: league' },
        { status: 400 }
      )
    }

    if (!season) {
      return NextResponse.json(
        { error: 'Parâmetro obrigatório ausente: season' },
        { status: 400 }
      )
    }

    return apiFootballFetchJson(
      '/fixtures',
      req.nextUrl.searchParams,
      'no-store'
    )
  } catch (error: unknown) {
    console.error('[fixtures/by-league] error:', error)

    return NextResponse.json(
      { error: 'Erro interno ao buscar fixtures por liga.' },
      { status: 500 }
    )
  }
}
