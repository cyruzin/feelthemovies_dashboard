// @flow
import React, { useReducer, useEffect, useCallback } from 'react'

import { types, initialState, reducer } from './duck'
import { httpFetch } from '../../util/request'

import {
    Alert,
    BreadCrumbs,
    Button,
    Input,
    FormGroup,
    Section,
    SectionTitle,
    Spinner
} from '../Common'

type Props = {
    history: Object,
    match: Object,
    location: Object
}

function GenresEdit (props: Props) {
    const [genres, dispatch] = useReducer(reducer, initialState)
    const { id } = props.match.params

    /**
    * Fetch genre by a given ID. 
    */
    const fetchGenre = useCallback(() => {
        dispatch({ type: types.FETCH })
        httpFetch({
            url: `/genre/${id}`,
            method: 'GET'
        }).then(response => dispatch({ type: types.NAME, payload: response.name }))
            .catch(error => dispatch({ type: types.FAILURE, payload: error.message }))
    }, [id])

    /**
     * On mount.
     */
    useEffect(() => {
        fetchGenre()
    }, [fetchGenre])

    /**
     * Edit the genre.
     */
    function editGenre () {
        const { name } = genres
        const newGenre = { name: name.trim() }

        httpFetch({
            url: `/genre/${id}`,
            method: 'PUT',
            data: newGenre
        }).then(() => {
            dispatch({ type: types.FAILURE, payload: '' })
            dispatch({ type: types.MESSAGE, payload: "Genre edited successfully" })
        }).catch(error => dispatch({ type: types.FAILURE, payload: error.message || error.errors[0].message }))
    }

    const {
        fetch, name, error, message
    } = genres

    return (
        <>
            <Alert message={error} variant="error" showAlert={error !== ''} />
            <Alert message={message} variant="success" showAlert={message !== ''} />
            <BreadCrumbs
                activeName="Edit"
                breadCrumbs={[{
                    key: 1,
                    path: '/dashboard/genres',
                    name: 'Genres'
                }]} />

            {fetch && <Spinner />}

            {!fetch &&
                <Section>
                    <SectionTitle title="Edit Genre" />
                    <FormGroup label="Name">
                        <Input
                            className="form-control"
                            value={name}
                            onChange={event => dispatch({ type: types.NAME, payload: event.target.value })} />
                    </FormGroup>
                    <FormGroup>
                        <Button onClick={editGenre}>Edit</Button>
                    </FormGroup>
                </Section>}
        </>
    )
}

export default GenresEdit