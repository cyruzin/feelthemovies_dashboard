import axios from 'axios'
import store from '../../store'
import { baseURL } from '.'

const apiToken = store.getState().auth.apiToken

const instance = axios.create({
    headers: {
        common: {
            "Api-Token": apiToken
        }
    },
    baseURL: baseURL
})

export default instance