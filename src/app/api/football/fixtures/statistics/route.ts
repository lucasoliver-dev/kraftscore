import { NextRequest, NextResponse } from 'next/server'
import { apiFootballFetchJson } from '@/app/api/football/_lib'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const fixture = req.nextUrl.searchParams.get('fixture')

    if (!fixture) {
      return NextResponse.json(
        { error: 'Parâmetro obrigatório ausente: fixture' },
        { status: 400 }
      )
    }

    return apiFootballFetchJson(
      '/fixtures/statistics',
      req.nextUrl.searchParams,
      'no-store'
    )
  } catch (error: unknown) {
    console.error('[fixtures/statistics] error:', error)

    return NextResponse.json(
      { error: 'Erro interno ao buscar fixture statistics.' },
      { status: 500 }
    )
  }
}
