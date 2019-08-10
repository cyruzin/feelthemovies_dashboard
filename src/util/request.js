import axios from 'axios'
import { baseURL, authURL, tmdbToken } from './constants'

/** 
 * For authentication requests 
 */

const feelTheMoviesAuth = axios.create({
    method: 'POST',
    baseURL: authURL
})

export const httpFetchAuthentication = credentials =>
    feelTheMoviesAuth({ data: credentials })
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data || error))

/** 
 * For common requests  
 */

const feelTheMovies = axios.create({
    baseURL: baseURL
})

feelTheMovies.interceptors.request.use(req => {
    const store = localStorage.getItem('state')
    const state = JSON.parse(store)
    const { token } = state.authentication.user
    req.headers.common['Authorization'] = `Bearer ${token}`
    return req
}, error => Promise.reject(error))

export const httpFetch = ({ url, method, data, params }) =>
    feelTheMovies({ url, method, data, params })
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data || error))

/** 
 * For TMDb requests 
 */

const tmdb = axios.create({
    method: 'GET',
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        'api_key': tmdbToken
    }
})

export const httpFetchTMDb = ({ url }) =>
    tmdb({ url })
        .then(response => response.data)
        .catch(error => Promise.reject(error.response.data || error))
