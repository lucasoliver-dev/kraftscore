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
    const date = searchParams.get('date')

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
      next: { revalidate: 60 },
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
