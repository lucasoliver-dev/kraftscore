import { NextRequest, NextResponse } from 'next/server'
import { apiFootballFetchJson } from '@/app/api/football/_lib'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    return apiFootballFetchJson(
      '/leagues/seasons',
      req.nextUrl.searchParams,
      'revalidate-86400'
    )
  } catch (error: unknown) {
    console.error('[leagues/seasons] error:', error)

    return NextResponse.json(
      { error: 'Erro interno ao buscar seasons.' },
      { status: 500 }
    )
  }
}
