import axios from 'axios'
import { apiToken, baseUrl } from '../../util/constants'
import type from '../types/UsersTypes'

export const fetchUsers = ({ listLoaded }) => {
    return dispatch => {
        if (listLoaded) {
            dispatch({ type: type.LIST_LOADED, listLoaded: false })
        }

        axios.get(`${baseUrl}/users?api_token=${apiToken}`)
            .then(res => {
                dispatch({
                    type: type.FETCH_USERS,
                    data: res.data.data,
                })
                dispatch({ type: type.LIST_LOADED, listLoaded: true })
            })
            .catch(err => dispatch({ type: type.USER_ERROR, error: err }))
    }
}

export const listLoaded = value => {
    return {
        type: type.LIST_LOADED, listLoaded: value
    }
}

export const fetchSingleUser = id => {
    return dispatch => {
        axios.get(`${baseUrl}/user/${id}?api_token=${apiToken}`)
            .then(res => {
                dispatch({ type: type.FETCH_SINGLE_USER, data: res.data })
            })
            .catch(err => {
                dispatch({ type: type.USER_ERROR, error: err })
            })
    }
}

export const registerUser = user => {
    return dispatch => {
        dispatch({ type: type.USER_ERROR, error: '' })

        axios.post(`${baseUrl}/user?api_token=${apiToken}`, user)
            .then(res => {
                dispatch({
                    type: type.USER_REGISTER,
                    userRegister: 'User created successfully'
                })
            })
            .catch(() => {
                dispatch({
                    type: type.USER_REGISTER,
                    userRegister: ''
                })
                dispatch({
                    type: type.USER_ERROR,
                    error: 'Something went wrong'
                })
            })
    }
}

export const editUser = () => false

export const deleteUser = id => {
    return dispatch => {
        axios.delete(`${baseUrl}/user/${id}?api_token=${apiToken}`)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }
}

export const showRegistration = () => false

export const setError = value => {
    return {
        type: type.USER_ERROR, error: value
    }
}