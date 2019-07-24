import axios from 'axios'
import { baseURL, tmdbToken } from './constants'

export default axios.create({
    baseURL: baseURL
})

export const axiosTmdb = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        'api_key': tmdbToken
    }
})
