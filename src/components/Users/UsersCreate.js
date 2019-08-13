// @flow
import React, { useReducer } from 'react'

import { types, initialState, reducer } from './duck'
import { httpFetch } from '../../util/request'

import {
    Alert,
    BreadCrumbs,
    Button,
    Input,
    FormGroup,
    Section,
    SectionTitle
} from '../Common'

function UsersCreate () {
    const [users, dispatch] = useReducer(reducer, initialState)

    function createUser () {
        const { name, email, password } = users
        const newUser = {
            name: name.trim(),
            email: email.trim(),
            password: password.trim()
        }

        httpFetch({
            url: '/user',
            method: 'POST',
            data: newUser
        }).then(() => {
            dispatch({ type: types.RESET })
            dispatch({ type: types.MESSAGE, payload: "User created successfully" })
        }).catch(error => dispatch({ type: types.FAILURE, payload: error.message || error.errors[0].message }))
    }

    const {
        name, email, password, error, message
    } = users

    return (
        <>
            <Alert
                message={error}
                variant="error"
                showAlert={error !== ''}
                onClose={() => dispatch({ type: types.FAILURE, payload: '' })}
            />
            <Alert
                message={message}
                variant="success"
                showAlert={message !== ''}
                onClose={() => dispatch({ type: types.MESSAGE, payload: '' })}
            />
            <BreadCrumbs
                activeName="Create"
                breadCrumbs={[{
                    key: 1,
                    path: '/dashboard/users',
                    name: 'Users'
                }]} />
            <Section>
                <SectionTitle title="Create User" />
                <FormGroup label="Name">
                    <Input
                        className="form-control"
                        value={name}
                        onChange={event => dispatch({ type: types.NAME, payload: event.target.value })} />
                </FormGroup>
                <FormGroup label="E-mail">
                    <Input
                        className="form-control"
                        value={email}
                        onChange={event => dispatch({ type: types.EMAIL, payload: event.target.value })} />
                </FormGroup>
                <FormGroup label="Password">
                    <Input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={event => dispatch({ type: types.PASSWORD, payload: event.target.value })} />
                </FormGroup>
                <FormGroup>
                    <Button onClick={createUser}>Create</Button>
                </FormGroup>
            </Section>
        </>
    )
}

export default UsersCreate