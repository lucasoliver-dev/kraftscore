import { NextRequest, NextResponse } from 'next/server'
import { apiFootballFetchJson } from '@/app/api/football/_lib'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const league = req.nextUrl.searchParams.get('league')
    const season = req.nextUrl.searchParams.get('season')
    const team = req.nextUrl.searchParams.get('team')

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

    if (!team) {
      return NextResponse.json(
        { error: 'Parâmetro obrigatório ausente: team' },
        { status: 400 }
      )
    }

    return apiFootballFetchJson(
      '/teams/statistics',
      req.nextUrl.searchParams,
      'no-store'
    )
  } catch (error: unknown) {
    console.error('[teams/statistics] error:', error)

    return NextResponse.json(
      { error: 'Erro interno ao buscar team statistics.' },
      { status: 500 }
    )
  }
}
