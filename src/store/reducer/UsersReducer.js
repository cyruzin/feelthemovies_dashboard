import type from '../types/UsersTypes'

const initialState = {
    listLoaded: false,
    data: [],
    createUserLoaded: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case type.LIST_LOADED:
            return {
                ...state,
                listLoaded: action.listLoaded
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
        default:
            return state
    }
}