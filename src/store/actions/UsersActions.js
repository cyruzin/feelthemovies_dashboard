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
            .catch(err => dispatch({ type: type.ERROR, error: err }))
    }
}

export const listLoaded = value => {
    return {
        type: type.LIST_LOADED, listLoaded: value
    }
}

export const createUser = value => {
    return {
        type: type.CREATE_USER, createUserLoaded: value
    }
}

export const editUser = () => false

export const deleteUser = () => false

export const showRegistration = () => false