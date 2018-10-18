import axios from 'axios'
import type from '../types/AuthTypes'

export const fetchAuth = ({ email, password }) => {
    return dispatch => {
        axios.post(`http://feelthemovies.test/auth`, {
            email: email,
            password: password
        })
            .then(res => {
                dispatch({
                    type: type.AUTH_AUTHORIZED,
                    authorized: true,
                    apiToken: res.data.api_token,
                    password: '',
                    id: res.data.id,
                    error: ''
                })
            })
            .catch(err => {
                const { message } = err.response.data
                dispatch({ type: type.AUTH_ERROR, error: message })
            })
    }
}

export const setEmail = email => {
    return {
        type: type.AUTH_EMAIL, email: email
    }
}

export const setPassword = password => {
    return { type: type.AUTH_PASSWORD, password: password }
}
export const setError = value => {
    return { type: type.AUTH_ERROR, error: value }
}

export const logout = () => {
    return { type: type.AUTH_LOGOUT }
}