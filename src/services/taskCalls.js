import { BASE_URL, getFetch, postFetch } from '../constants/services'

export const getTasks= () => {
  return getFetch(`${BASE_URL}/tasks/list`)
}

export const getTasksByProject = (id_project) => {
  return getFetch(`${BASE_URL}/tasks/list/project/${id_project}`)
}

export const saveTask = (body) => {
  return postFetch(`${BASE_URL}/tasks/create`, body)
}