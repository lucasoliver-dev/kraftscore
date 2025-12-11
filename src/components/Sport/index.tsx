'use client'

import { useEffect, useRef, useState } from 'react'
import Fixture from '../Fixture'
import SportForm from '../SportForm'

/**
 * Container page for sport selection and fixtures list.
 * Mobile-first: form em cima, lista de jogos logo abaixo.
 */
const Sport = () => {
  const [sport, setSport] = useState('')
  const [date, setDate] = useState('')

  const resultsRef = useRef<HTMLDivElement | null>(null)

  /**
   * Handles form submission and stores selected sport/date.
   */
  const handleFormSubmit = async (
    selectedSport: string,
    selectedDate: string,
  ) => {
    setSport(selectedSport)
    setDate(selectedDate)
  }

  /**
   * After sport + date change (usuário fez uma busca),
   * scrolla suavemente até o bloco de resultados.
   */
  useEffect(() => {
    if (sport && date && resultsRef.current) {
      resultsRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [sport, date])

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-3 pb-6 pt-4 sm:px-4">
        {/* Form de seleção de esporte/data */}
        <SportForm onSubmitForm={handleFormSubmit} />

        {/* Resultados */}
        <div ref={resultsRef}>
          {sport && date && <Fixture sport={sport} date={date} />}
        </div>
      </div>
    </div>
  )
}

export default Sport
