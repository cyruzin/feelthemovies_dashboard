import axios from 'axios'
import { baseURL } from './constants'

const feelTheMovies = axios.create({
    baseURL: baseURL
})

feelTheMovies.interceptors.request.use(req => {
    const store = localStorage.getItem('state')
    const state = JSON.parse(store)
    const { token } = state.auth
    req.headers.common['Authorization'] = `Bearer ${token}`
    return req
}, error => Promise.reject(error))

export const httpFetch = ({ url, method, data, params }) =>
    feelTheMovies({ url, method, data, params })
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data))