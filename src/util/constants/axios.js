import axios from 'axios'
import { baseURL, tmdbToken } from '.'

export default axios.create({
    baseURL: baseURL
})

export const axiosTmdb = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {},
    params: {
        'api_key': tmdbToken
    }
})
