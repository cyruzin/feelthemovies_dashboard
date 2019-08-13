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

function KeywordsEdit (props: Props) {
    const [keywords, dispatch] = useReducer(reducer, initialState)
    const { id } = props.match.params

    /**
    * Fetch keyword by a given ID. 
    */
    const fetchKeyword = useCallback(() => {
        dispatch({ type: types.FETCH })
        httpFetch({
            url: `/keyword/${id}`,
            method: 'GET'
        }).then(response => dispatch({ type: types.NAME, payload: response.name }))
            .catch(error => dispatch({ type: types.FAILURE, payload: error.message }))
    }, [id])

    /**
     * On mount.
     */
    useEffect(() => {
        fetchKeyword()
    }, [fetchKeyword])

    /**
     * Edit the keyword.
     */
    function editKeyword () {
        const { name } = keywords
        const newKeyword = { name: name.trim() }

        httpFetch({
            url: `/keyword/${id}`,
            method: 'PUT',
            data: newKeyword
        }).then(() => {
            dispatch({ type: types.FAILURE, payload: '' })
            dispatch({ type: types.MESSAGE, payload: "Keyword edited successfully" })
        }).catch(error => dispatch({ type: types.FAILURE, payload: error.message || error.errors[0].message }))
    }

    const {
        fetch, name, error, message
    } = keywords

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
                activeName="Edit"
                breadCrumbs={[{
                    key: 1,
                    path: '/dashboard/keywords',
                    name: 'Keywords'
                }]} />

            {fetch && <Spinner />}

            {!fetch &&
                <Section>
                    <SectionTitle title="Edit Keyword" />
                    <FormGroup label="Name">
                        <Input
                            className="form-control"
                            value={name}
                            onChange={event => dispatch({ type: types.NAME, payload: event.target.value })} />
                    </FormGroup>
                    <FormGroup>
                        <Button onClick={editKeyword}>Edit</Button>
                    </FormGroup>
                </Section>}
        </>
    )
}

export default KeywordsEdit