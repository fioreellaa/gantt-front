import { BASE_URL, getFetch, postFetch } from '../constants/services'

export const getUser= () => {
  return getFetch(`${BASE_URL}/user/session`)
}

export const saveUser= (body) => {
  return postFetch(`${BASE_URL}/user/register`, body)
}

export const findAccount = (body) => {
  return postFetch(`${BASE_URL}/user/login`, body)
}