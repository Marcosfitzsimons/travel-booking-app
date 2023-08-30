import axios from 'axios'

export default axios.create({
    baseURL: `${import.meta.env.VITE_REACT_APP_API_BASE_ENDPOINT}`
})

export const axiosPrivate = axios.create({
    baseURL: `${import.meta.env.VITE_REACT_APP_API_BASE_ENDPOINT}`,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})