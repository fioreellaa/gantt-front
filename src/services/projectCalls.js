import { BASE_URL, getFetch, postFetch, putFetch} from '../constants/services'


export const getProjects= () => {
  return getFetch(`${BASE_URL}/project/list`)
}

export const getProjectsByWorkbook = (idWorkbook) => {
  return getFetch(`${BASE_URL}/project/workbook/${idWorkbook}`)
}

export const getProjectById = (idProject) => {
  return getFetch(`${BASE_URL}/project/info/${idProject}`)
}

export const updateStateProject = (id_project) => {
  return putFetch(`${BASE_URL}/project/updateState/${id_project}`)
}

export const updateProjectName = (body) => {
  return putFetch(`${BASE_URL}/project/update`, body)
}

export const saveProject = (body) => {
  return postFetch(`${BASE_URL}/project/create`, body)
}