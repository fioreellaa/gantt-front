import { BASE_URL, getFetch, postFetch, putFetch } from '../constants/services'


export const getWorkbooks= () => {
  return getFetch(`${BASE_URL}/workbook/list`)
}

export const updateWorkbook = (body) => {
  return putFetch(`${BASE_URL}/workbook/update`, body)
}

export const saveWorkbook = (body) => {
  return postFetch(`${BASE_URL}/workbook/create`, body)
}