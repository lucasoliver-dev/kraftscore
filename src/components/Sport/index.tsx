'use client'

import { useEffect, useRef, useState } from 'react'
import Fixture from '@/components/Fixture'
import SportForm from '@/components/SportForm'
import Section from '@/components/layout/section/Section'
import PageLayout from '@/components/layout/PageLayout'
import Stack from '@/components/layout/stack/Stack'
import styles from './sport.module.scss'

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
    selectedDate: string
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
    <Section>
      <PageLayout>
        <Stack>
          <SportForm onSubmitForm={handleFormSubmit} />
          <div ref={resultsRef} className={styles.results}>
            {sport && date && <Fixture sport={sport} date={date} />}
          </div>
        </Stack>
      </PageLayout>
    </Section>
  )
}

export default Sport
