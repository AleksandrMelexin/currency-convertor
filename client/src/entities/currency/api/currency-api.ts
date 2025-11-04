import { instance } from '@/shared/api/server-api'

export const getCurrencyList = async () => {
  const response = await instance.get('/currencies')
  return response.data
}

export const convertCurrency = async (from: string, to: string, amount: number) => {
  const response = await instance.get(`/convert?from=${from}&to=${to}&amount=${amount}`)
  return response.data.result
}