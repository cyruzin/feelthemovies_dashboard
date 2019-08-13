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

function KeywordsCreate () {
    const [keywords, dispatch] = useReducer(reducer, initialState)

    /**
     * Create the keyword.
     */
    function createKeyword () {
        const { name } = keywords
        const newKeyword = { name: name.trim() }

        httpFetch({
            url: '/keyword',
            method: 'POST',
            data: newKeyword
        }).then(() => {
            dispatch({ type: types.RESET })
            dispatch({ type: types.MESSAGE, payload: "Keyword created successfully" })
        }).catch(error => dispatch({ type: types.FAILURE, payload: error.message || error.errors[0].message }))
    }

    const {
        name, error, message
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
                activeName="Create"
                breadCrumbs={[{
                    key: 1,
                    path: '/dashboard/keywords',
                    name: 'Keywords'
                }]} />
            <Section>
                <SectionTitle title="Create Keyword" />
                <FormGroup label="Name">
                    <Input
                        className="form-control"
                        value={name}
                        onChange={event => dispatch({ type: types.NAME, payload: event.target.value })} />
                </FormGroup>
                <FormGroup>
                    <Button onClick={createKeyword}>Create</Button>
                </FormGroup>
            </Section>
        </>
    )
}

export default KeywordsCreate