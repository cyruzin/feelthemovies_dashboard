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

function GenresCreate () {
    const [genres, dispatch] = useReducer(reducer, initialState)

    /**
     * Create the genre.
     */
    function createGenre () {
        const { name } = genres
        const newGenre = { name: name.trim() }

        httpFetch({
            url: '/genre',
            method: 'POST',
            data: newGenre
        }).then(() => {
            dispatch({ type: types.RESET })
            dispatch({ type: types.MESSAGE, payload: "Genre created successfully" })
        }).catch(error => dispatch({ type: types.FAILURE, payload: error.message || error.errors[0].message }))
    }

    const {
        name, error, message
    } = genres

    return (
        <>
            <Alert message={error} variant="error" showAlert={error !== ''} />
            <Alert message={message} variant="success" showAlert={message !== ''} />
            <BreadCrumbs
                activeName="Create"
                breadCrumbs={[{
                    key: 1,
                    path: '/dashboard/genres',
                    name: 'Genres'
                }]} />
            <Section>
                <SectionTitle title="Create Genre" />
                <FormGroup label="Name">
                    <Input
                        className="form-control"
                        value={name}
                        onChange={event => dispatch({ type: types.NAME, payload: event.target.value })} />
                </FormGroup>
                <FormGroup>
                    <Button onClick={createGenre}>Create</Button>
                </FormGroup>
            </Section>
        </>
    )
}

export default GenresCreate