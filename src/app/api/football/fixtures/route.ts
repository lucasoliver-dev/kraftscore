import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const API_FOOTBALL_BASE_URL =
  process.env.API_FOOTBALL_BASE_URL ?? 'https://v3.football.api-sports.io'

const API_FOOTBALL_KEY = process.env.API_FOOTBALL_KEY ?? ''

export async function GET(req: NextRequest) {
  try {
    if (!API_FOOTBALL_KEY) {
      return NextResponse.json(
        { error: 'API_FOOTBALL_KEY não configurada.' },
        { status: 500 }
      )
    }

    const date = req.nextUrl.searchParams.get('date')

    if (!date) {
      return NextResponse.json(
        { error: 'Parâmetro obrigatório ausente: date' },
        { status: 400 }
      )
    }

    const url = `${API_FOOTBALL_BASE_URL}/fixtures?date=${date}`

    const response = await fetch(url, {
      headers: {
        'x-apisports-key': API_FOOTBALL_KEY,
      },
      cache: 'no-store',
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: unknown) {
    console.error('[fixtures] error:', error)

    return NextResponse.json(
      { error: 'Erro interno ao buscar fixtures.' },
      { status: 500 }
    )
  }
}
