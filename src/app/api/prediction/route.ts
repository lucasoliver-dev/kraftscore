import {
  getCachedPrediction,
  setCachedPrediction,
  type PredictionKeyParams,
} from '@/services/predictionCache'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

/**
 * Shape of the request body expected by the prediction endpoint.
 */
type PredictionRequestBody = {
  date: string
  leagueCountry: string
  leagueName: string
  teamAway: string
  teamHome: string
}

/**
 * Minimal error shape used to safely inspect OpenAI errors.
 */
type OpenAIErrorLike = {
  code?: string
  error?: {
    code?: string
  }
}

/**
 * OpenAI client configured with the server-side API key.
 */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

/**
 * Simple health-check endpoint for the prediction route.
 *
 * Useful to quickly verify if the route is reachable.
 */
export async function GET() {
  return NextResponse.json({ status: 'ok from prediction' })
}

/**
 * Generates or retrieves an AI-based prediction for a given football match.
 *
 * The prediction is identified by:
 * - leagueCountry
 * - leagueName
 * - teamHome
 * - teamAway
 * - date
 *
 * For identical parameters, the result is cached in memory for a limited time,
 * avoiding repeated calls to the OpenAI API and speeding up responses.
 *
 * @param req - The incoming request containing match information in the body.
 * @returns A JSON response with the prediction text.
 */
export async function POST(req: Request) {
  try {
    const {
      leagueCountry,
      leagueName,
      teamHome,
      teamAway,
      date,
    }: PredictionRequestBody = await req.json()

    if (!leagueCountry || !leagueName || !teamHome || !teamAway || !date) {
      return NextResponse.json(
        { error: 'Parâmetros obrigatórios ausentes.' },
        { status: 400 }
      )
    }

    const cacheParams: PredictionKeyParams = {
      date,
      leagueCountry,
      leagueName,
      teamAway,
      teamHome,
    }

    /**
     * First, try to return a prediction already stored in cache.
     */
    const cachedPrediction = getCachedPrediction(cacheParams)

    if (cachedPrediction) {
      return NextResponse.json({
        prediction: cachedPrediction,
      })
    }

    const systemPrompt =
      'Você é um especialista em futebol (tipster profissional). ' +
      'Responda SEMPRE em português do Brasil, de forma clara, direta e organizada. ' +
      'Mantenha sempre a mesma estrutura de seções para que o sistema possa processar a resposta programaticamente.'

    const userPrompt = `
Analise a partida:

- País / competição: ${leagueCountry}
- Liga: ${leagueName}
- Jogo: ${teamHome} x ${teamAway}
- Data: ${date}

Considere:
- momento recente dos times,
- mando de campo,
- possíveis desfalques e elenco,
- histórico recente entre as equipes,
- tendência de gols e estilo de jogo.

Sua resposta DEVE seguir EXATAMENTE esta estrutura de seções, nesta ordem:

### Detalhes da análise
- Traga um texto explicando o contexto da partida (momento dos times, mando de campo, desfalques, histórico e estilo de jogo).
- Use parágrafos e listas quando fizer sentido.

### Resumo Estatístico (0 a 100)
Traga um resumo numérico simples, de 0 a 100, usando EXATAMENTE o formato abaixo:

- Time da casa (${teamHome}): Ataque: X/100, Defesa: Y/100, Forma recente: Z/100
- Time visitante (${teamAway}): Ataque: X/100, Defesa: Y/100, Forma recente: Z/100

Onde:
- "Ataque" representa a força ofensiva (capacidade de criar e converter chances).
- "Defesa" representa a solidez defensiva (capacidade de evitar gols).
- "Forma recente" representa o desempenho geral nos últimos jogos.
- Não use casas decimais, apenas inteiros (ex: 65/100).

### Previsões
Traga EXATAMENTE 3 previsões numeradas (Previsão 1, Previsão 2, Previsão 3).
Para CADA previsão, inclua SEMPRE as três linhas abaixo, nesse formato:

- Mercado sugerido: <descrição do mercado> (ex: Vitória do ${teamAway}, Dupla chance, Under 2.5 gols etc.)
- Porcentagem estimada de acerto: NN%
- Justificativa: <texto curto e objetivo>

Importante:
- Mantenha SEMPRE os títulos das seções exatamente como acima.
- Não retorne nada fora dessa estrutura.
- Use apenas texto em Markdown (títulos, listas, negrito quando fizer sentido).
`

    const completion = await openai.chat.completions.create({
      max_tokens: 700,
      messages: [
        { content: systemPrompt, role: 'system' },
        { content: userPrompt, role: 'user' },
      ],
      model: 'gpt-4o-mini',
      temperature: 0.8,
    })

    const prediction =
      completion.choices[0]?.message?.content ??
      'Não foi possível gerar a previsão no momento.'

    /**
     * Store the prediction in cache for future calls
     * with the same parameters.
     */
    setCachedPrediction(cacheParams, prediction)

    return NextResponse.json({ prediction })
  } catch (error: unknown) {
    console.error('OpenAI error:', error)

    const openaiError = error as OpenAIErrorLike
    const code = openaiError.error?.code ?? openaiError.code

    if (code === 'insufficient_quota') {
      return NextResponse.json(
        {
          prediction:
            'Limite de uso da IA atingido na conta do servidor. Tente novamente mais tarde.',
        },
        { status: 200 }
      )
    }

    return NextResponse.json(
      {
        error: 'Erro ao gerar previsão com IA.',
      },
      { status: 500 }
    )
  }
}
