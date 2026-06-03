import axios from 'axios'

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
})

const handleError = (error) => {
  const message = error?.response?.data?.message || error?.message || 'Authentication error'
  throw new Error(message)
}

export const register = async ({ name, email, password }) => {
    console.log({ name, email, password })
  try {
    const response = await API.post('/api/auth/register',{ name, email, password })
    return response.data
  } catch (error) {
    handleError(error)
  }
}

export const login = async ({ email, password }) => {
    console.log({ email, password })
  try {
    const response = await API.post('/api/auth/login', { email, password })
    return response.data
  } catch (error) {
    handleError(error)
  }
}

export const logout = async () => {
  try {
    const response = await API.post('/api/auth/logout')
    return response.data
  } catch (error) {
    handleError(error)
  }
}


export const updateProfile = async (payload) => {
  try {
    const response = await API.put('/api/auth/update', payload)
    return response.data
  } catch (error) {
    handleError(error)
  }
}
