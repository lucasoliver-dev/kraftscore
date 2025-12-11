'use client'

import { useState } from 'react'
import { z } from 'zod'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Button } from '@/components/ui/button'

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

/**
 * Zod schema used to validate the sport selection form.
 */
const today = new Date()
today.setHours(0, 0, 0, 0)

const schema = z.object({
  date: z.date().refine((date: Date): boolean => date >= today, {
    message: 'Please select a date from today or later',
  }),
  sport: z.string().min(1, 'Please select a sport'),
})

/**
 * Form component responsible for selecting the sport
 * and the desired date to search for fixtures.
 *
 * @param props - The component props.
 * @param props.onSubmitForm - Callback invoked on successful submission.
 */
const SportForm = ({ onSubmitForm }: SportFormProps) => {
  const [values, setValues] = useState<SportFormValues>({
    date: new Date(),
    sport: '',
  })
  const [errors, setErrors] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  /**
   * Handles changes to the sport select input.
   *
   * @param event - The change event.
   */
  const handleSportChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValues((current: SportFormValues) => ({
      ...current,
      sport: event.target.value,
    }))
  }

  /**
   * Handles changes to the date picker input.
   *
   * @param date - The selected date.
   */
  const handleDateChange = (date: Date | null) => {
    if (!date) return

    setValues((current: SportFormValues) => ({
      ...current,
      date,
    }))
  }

  /**
   * Handles form submission, validates values using Zod
   * and forwards valid data to the parent callback.
   *
   * @param event - The submit event.
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const result = schema.safeParse(values)

    if (result.success) {
      const formattedDate = values.date.toISOString().slice(0, 10)
      setErrors([])
      setIsSubmitting(true)

      try {
        await onSubmitForm(values.sport, formattedDate)
      } finally {
        setIsSubmitting(false)
      }
    } else {
      const errorMessages = result.error.issues.map(
        (issue: { message: string }) => issue.message
      )
      setErrors(errorMessages)
    }
  }

  return (
    <form
      className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/80 px-4 py-4 sm:px-6 sm:py-5"
      onSubmit={handleSubmit}
    >
      <div className="w-full md:w-2/4">
        <label
          className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-300"
          htmlFor="sport"
        >
          Selecione modalidade
        </label>
        <select
          className="mb-1 block w-full appearance-none rounded-md border border-zinc-700 bg-zinc-900 py-2.5 px-3 text-sm text-zinc-100 shadow-sm outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          id="sport"
          name="sport"
          value={values.sport}
          onChange={handleSportChange}
        >
          <option value="">Selecione um esporte</option>
          <option value="soccer">Futebol</option>
          {/* <option value="basketball">Basketball</option> */}
        </select>
        <p className="text-[11px] text-zinc-500">
          Por enquanto apenas futebol está disponível.
        </p>
      </div>

      <div className="w-full md:w-2/4">
        <label
          className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-300"
          htmlFor="date"
        >
          Selecione data
        </label>
        <DatePicker
          className="mb-1 block w-full rounded-md border border-zinc-700 bg-zinc-900 py-2.5 px-3 text-sm text-zinc-100 shadow-sm outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          id="date"
          minDate={today}
          name="date"
          onChange={handleDateChange}
          selected={values.date}
          dateFormat="dd/MM/yyyy"
        />
        <p className="text-[11px] text-zinc-500">
          Buscaremos os jogos dessa data nas ligas suportadas.
        </p>
      </div>

      {errors.length > 0 && (
        <ul className="w-full md:w-2/4 list-disc space-y-1 pl-4 text-xs text-red-400">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        variant="neon"
        className="mt-2 w-full md:w-2/4"
      >
        {isSubmitting ? 'Buscando...' : 'Buscar'}
      </Button>
    </form>
  )
}

export default SportForm
