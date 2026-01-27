import axios from 'axios'

export const apiFootballClient = axios.create({
  baseURL: '/api/football',
})
