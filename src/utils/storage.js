
import { initState } from '../store/state'
import { HDWX_STATE } from '../store/mutations'

export const setItem = (key, value) => {
  const map = getMap()
  map[key] = value
  sessionStorage.setItem(HDWX_STATE, JSON.stringify(map))
}

export const getItem = (key) => {
  const map = getMap()
  return map[key]
}

export const removeItem = (key) => {
  const map = getMap()
  delete map[key]
  sessionStorage.setItem(HDWX_STATE, JSON.stringify(map))
}

export const clear = () => {
  sessionStorage.setItem(HDWX_STATE, JSON.stringify(initState))
}

const getMap = () => {
  try {
    return JSON.parse(sessionStorage.getItem(HDWX_STATE)) || initState
  } catch (error) {
    return initState
  }
}
