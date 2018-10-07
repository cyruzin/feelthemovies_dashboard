import type from '../types/UsersTypes'

const initialState = {
    listLoaded: false,
    editLoaded: false,
    data: [],
    createUserLoaded: false,
    userRegister: '',
    userEdited: '',
    userDeleted: '',
    userData: '',
    error: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case type.LIST_LOADED:
            return {
                ...state,
                listLoaded: action.listLoaded
            }
        case type.EDIT_LOADED:
            return {
                ...state,
                editLoaded: action.editLoaded
            }
        case type.FETCH_USERS:
            return {
                ...state,
                data: action.data
            }
        case type.CREATE_USER:
            return {
                ...state,
                createUserLoaded: action.createUserLoaded
            }
        case type.USER_REGISTER:
            return {
                ...state,
                userRegister: action.userRegister
            }
        case type.USER_EDITED:
            return {
                ...state,
                userEdited: action.userEdited
            }
        case type.USER_DELETED:
            return {
                ...state,
                userDeleted: action.userDeleted
            }
        case type.FETCH_SINGLE_USER:
            return {
                ...state,
                userData: action.userData
            }
        case type.USER_ERROR:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}