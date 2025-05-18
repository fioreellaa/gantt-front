import { BASE_URL, getFetch, postFetch } from '../constants/services'

export const getSections= () => {
  return getFetch(`${BASE_URL}/section/list`)
}

export const getSectionsByProject = (id_project) => {
  return getFetch(`${BASE_URL}/section/project/${id_project}`)
}

export const saveSection = (body) => {
  return postFetch(`${BASE_URL}/section/create`, body)
}