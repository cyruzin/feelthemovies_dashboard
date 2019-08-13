import reducer, {
    types,
    initialState,
    fetchAuthentication,
    successAuthentication,
    failureAuthentication,
    resetAuthentication
} from '../../../redux/ducks/authentication'

/**
 * Reducer tests.
 */

describe('authentication reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should handle FETCH type', () => {
        const fetchAction = {
            type: types.FETCH
        }

        expect(reducer(initialState, fetchAction))
            .toEqual({
                fetch: true,
                error: '',
                authorized: false,
                user: {}
            })
    })

    it('should handle SUCCESS type', () => {
        const successAction = {
            type: types.SUCCESS,
            payload: {
                id: 1,
                name: 'Admin',
                email: 'admin@admin.com'
            }
        }

        expect(reducer(initialState, successAction))
            .toEqual({
                fetch: false,
                error: '',
                authorized: true,
                user: {
                    id: 1,
                    name: 'Admin',
                    email: 'admin@admin.com'
                }
            })
    })

    it('should handle FAILURE type', () => {
        const failureAction = {
            type: types.FAILURE,
            payload: 'Something went wrong'
        }

        expect(reducer(initialState, failureAction))
            .toEqual({
                fetch: false,
                error: 'Something went wrong',
                authorized: false,
                user: {}
            })
    })

    it('should handle RESET type', () => {
        const resetAction = {
            type: types.RESET
        }

        expect(reducer(initialState, resetAction))
            .toEqual(initialState)
    })
})

/**
 * Action tests.
 */

describe('discovery actions', () => {
    it('should create an action to change fetch value', () => {
        const expectedAction = {
            type: types.FETCH
        }

        expect(fetchAuthentication()).toEqual(expectedAction)
    })
})

describe('discovery actions', () => {
    it('should handle SUCCESS action', () => {
        const expectedAction = {
            type: types.SUCCESS
        }

        expect(successAuthentication()).toEqual(expectedAction)
    })
})

describe('discovery actions', () => {
    it('should handle FAILURE action', () => {
        const expectedAction = {
            type: types.FAILURE
        }

        expect(failureAuthentication()).toEqual(expectedAction)
    })
})

describe('discovery actions', () => {
    it('should handle RESET action', () => {
        const expectedAction = {
            type: types.RESET
        }

        expect(resetAuthentication()).toEqual(expectedAction)
    })
})