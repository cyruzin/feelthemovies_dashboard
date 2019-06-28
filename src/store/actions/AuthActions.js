import axios from 'axios'
import jwtDecode from 'jwt-decode'
import type from '../types/AuthTypes'
import { authURL } from '../../util/constants'

export const fetchAuth = ({ email, password }) => {
    return dispatch => {
        axios.post(authURL, {
            email: email,
            password: password
        })
            .then(res => {
                const claims = jwtDecode(res.data.token)
                const payload = {
                    token: res.data.token,
                    ...claims
                }

                dispatch({
                    type: type.AUTH_AUTHORIZED,
                    payload
                })
            })
            .catch(err => {
                debugger
                console.log(process.env.REACT_APP_BASE_URL)
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

export const sessionTimeOut = date => ({
    type: type.AUTH_SESSION,
    session: date
})