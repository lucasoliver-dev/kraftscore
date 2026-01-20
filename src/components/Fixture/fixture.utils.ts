export const formatFixtureDate = (rawDate: string): string => {
  const d = new Date(rawDate)
  const year = d.getFullYear()

  const monthNumber = d.getMonth() + 1
  const dayNumber = d.getDate()

  const month = monthNumber < 10 ? `0${monthNumber}` : String(monthNumber)
  const day = dayNumber < 10 ? `0${dayNumber}` : String(dayNumber)

  return `${year}-${month}-${day}`
}
