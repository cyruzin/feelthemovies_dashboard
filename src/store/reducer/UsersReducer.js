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
        case type.USERS_FETCH:
            return {
                ...state,
                data: action.data
            }
        case type.USERS_FETCH_SINGLE:
            return {
                ...state,
                userData: action.userData
            }
        case type.USERS_LOADED:
            return {
                ...state,
                listLoaded: action.listLoaded
            }
        case type.USERS_CREATE:
            return {
                ...state,
                createUserLoaded: action.createUserLoaded
            }
        case type.USERS_REGISTER:
            return {
                ...state,
                userRegister: action.userRegister
            }
        case type.USERS_EDIT:
            return {
                ...state,
                userEdited: action.userEdited
            }
        case type.USERS_EDIT_LOADED:
            return {
                ...state,
                editLoaded: action.editLoaded
            }
        case type.USERS_DELETE:
            return {
                ...state,
                userDeleted: action.userDeleted
            }
        case type.USERS_ERROR:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}