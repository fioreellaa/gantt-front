import { BASE_URL, getFetch, postFetch } from '../constants/services'


export const getWorkbooks= () => {
  return getFetch(`${BASE_URL}/workbook/list`)
}

export const saveWorkbook = (body) => {
  return postFetch(`${BASE_URL}/workbook/create`, body)
}