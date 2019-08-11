import axios from 'axios'
import { baseURL, authURL, tmdbToken } from './constants'

/** 
 * For authentication requests 
 */

const feelTheMoviesAuth = axios.create({
    method: 'POST',
    baseURL: authURL
})

export async function httpFetchAuthentication (credentials) {
    try {
        const response = await feelTheMoviesAuth({ data: credentials })
        return response.data
    } catch (error) {
        if (error.response) {
            /**
             * The server responded with a status code
             * that falls out of the range of 2xx.
             */
            throw error.response.data
        } else if (error.request) {
            /**
            * The request was made but no response was received.
            */
            throw Error('No response from the server')
        } else {
            /**
             * Something went wrong in setting up the request.
             */
            throw Error('Network error')
        }
    }
}

/** 
 * For common requests  
 */

const feelTheMovies = axios.create({
    baseURL: baseURL
})

feelTheMovies.interceptors.request.use(req => {
    const newReq = req

    const store = localStorage.getItem('state')
    const state = JSON.parse(store)

    const { token } = state.authentication.user

    newReq.headers.common['Authorization'] = `Bearer ${token}`

    return newReq
})

export async function httpFetch ({ url, method, data, params }) {
    try {
        const response = await feelTheMovies({ url, method, data, params })
        return response.data
    } catch (error) {
        if (error.response) {
            /**
             * The server responded with a status code
             * that falls out of the range of 2xx.
             */
            throw error.response.data
        } else if (error.request) {
            /**
             * The request was made but no response was received.
             */
            throw Error('No response from the server')
        } else {
            /**
             * Something went wrong in setting up the request.
             */
            throw Error('Network error')
        }
    }
}

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

export async function httpFetchTMDb ({ url }) {
    try {
        const response = await tmdb({ url })
        return response.data
    } catch (error) {
        if (error.response) {
            /**
             * The server responded with a status code
             * that falls out of the range of 2xx.
             */
            throw error.response.data.status_message
        } else if (error.request) {
            /**
             * The request was made but no response was received.
             */
            throw Error('No response from the server')
        } else {
            /**
             * Something went wrong in setting up the request.
             */
            throw Error('Network error')
        }
    }
}
