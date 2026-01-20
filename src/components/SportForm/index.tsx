'use client'

import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import DatePicker from 'react-datepicker'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import styles from './sport-form.module.scss'
import 'react-datepicker/dist/react-datepicker.css'

/**
 * Values handled by the sport form.
 */
export type SportFormValues = {
  date: Date
  sport: string
}

/**
 * Props for the SportForm component.
 */
export type SportFormProps = {
  /**
   * Callback invoked when the form is successfully submitted.
   * The date is formatted as YYYY-MM-DD.
   */
  onSubmitForm: (sport: string, date: string) => void | Promise<void>
}

const today = new Date()
today.setHours(0, 0, 0, 0)

const schema = z.object({
  date: z.date().refine((date: Date): boolean => date >= today, {
    message: 'Selecione uma data de hoje em diante.',
  }),
  sport: z.string().min(1, 'Selecione um esporte.'),
})

const formatDateYYYYMMDD = (date: Date) => {
  return date.toISOString().slice(0, 10)
}

/**
 * Form component responsible for selecting the sport
 * and the desired date to search for fixtures.
 */
const SportForm = ({ onSubmitForm }: SportFormProps) => {
  const [values, setValues] = useState<SportFormValues>({
    date: new Date(),
    sport: '',
  })

  const [errors, setErrors] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSportChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setValues(current => ({
      ...current,
      sport: event.target.value,
    }))
  }

  const handleDateChange = (date: Date | null) => {
    if (!date) return

    setValues(current => ({
      ...current,
      date,
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const result = schema.safeParse(values)

    if (!result.success) {
      setErrors(result.error.issues.map(issue => issue.message))
      return
    }

    setErrors([])
    setIsSubmitting(true)

    try {
      await onSubmitForm(values.sport, formatDateYYYYMMDD(values.date))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.fields}>
        {/* Sport */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor="sport">
            Selecione modalidade
          </label>

          <Select
            value={values.sport}
            onValueChange={sport =>
              setValues(current => ({ ...current, sport }))
            }
          >
            <SelectTrigger variant="neon">
              <SelectValue placeholder="Selecione um esporte" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="soccer">Futebol</SelectItem>
            </SelectContent>
          </Select>


          <p className={styles.helper}>
            Por enquanto apenas futebol está disponível.
          </p>
        </div>

        {/* Date */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor="date">
            Selecione data
          </label>

          <DatePicker
            className={styles.control}
            id="date"
            name="date"
            minDate={today}
            selected={values.date}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
          />

          <p className={styles.helper}>
            Buscaremos os jogos dessa data nas ligas suportadas.
          </p>
        </div>

        {/* Errors */}
        {errors.length > 0 && (
          <ul className={styles.errors}>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}

        {/* Action */}
        <div className={styles.actions}>
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="neon"
            size="lg">
            {isSubmitting ? 'Buscando...' : 'Buscar'}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default SportForm
