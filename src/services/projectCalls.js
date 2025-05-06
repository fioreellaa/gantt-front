import { BASE_URL, getFetch, postFetch } from '../constants/services'


export const getProjects= () => {
  return getFetch(`${BASE_URL}/project/list`)
}

export const getProjectsByWorkbook = (idWorkbook) => {
  return getFetch(`${BASE_URL}/project/workbook/${idWorkbook}`)
}

export const saveProject = (body) => {
  return postFetch(`${BASE_URL}/project/create`, body)
}