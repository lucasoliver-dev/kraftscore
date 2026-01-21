import { NextResponse } from 'next/server'

const API_FOOTBALL_BASE_URL =
  process.env.API_FOOTBALL_BASE_URL ?? 'https://v3.football.api-sports.io'

const API_FOOTBALL_KEY = process.env.API_FOOTBALL_KEY ?? ''

export async function GET(req: Request) {
  try {
    if (!API_FOOTBALL_KEY) {
      return NextResponse.json(
        { error: 'API_FOOTBALL_KEY não configurada.' },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(req.url)

    const league = searchParams.get('league')
    const season = searchParams.get('season')

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

    const url = `${API_FOOTBALL_BASE_URL}/standings?league=${league}&season=${season}`

    const response = await fetch(url, {
      headers: {
        'x-apisports-key': API_FOOTBALL_KEY,
      },
      next: { revalidate: 60 },
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: unknown) {
    console.error('[standings] error:', error)

    return NextResponse.json(
      { error: 'Erro interno ao buscar standings.' },
      { status: 500 }
    )
  }
}
