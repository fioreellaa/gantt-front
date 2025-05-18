import { BASE_URL, getFetch, postFetch } from '../constants/services'

export const getTasks= () => {
  return getFetch(`${BASE_URL}/task/list`)
}

export const getTasksBySection = (id_section) => {
  return getFetch(`${BASE_URL}/task/section/list/${id_section}`)
}

export const saveTask = (body) => {
  return postFetch(`${BASE_URL}/task/create`, body)
}