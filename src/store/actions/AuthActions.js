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
                    type: type.AUTHORIZED,
                    authorized: true,
                    apiToken: res.data.api_token,
                    password: '',
                    error: ''
                })
            })
            .catch(err => {
                const { message } = err.response.data
                dispatch({ type: type.ERROR, error: message })
            })
    }
}

export const setEmail = email => {
    return {
        type: type.EMAIL, email: email
    }
}

export const setPassword = password => {
    return { type: type.PASSWORD, password: password }
}
export const setError = value => {
    return { type: type.ERROR, error: value }
}

export const logout = () => {
    return { type: type.LOGOUT }
}