import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getKeywords } from '../../redux/ducks/keywords'

import KeywordsList from './KeywordsList'

import {
    Alert,
    NoResults,
    SectionHeader,
    Spinner,
} from '../Common'

function Keywords () {
    const keywords = useSelector(state => state.keywords)
    const dispatch = useDispatch()
    const { fetch, data, error, message } = keywords

    useEffect(() => {
        dispatch(getKeywords())
    }, [dispatch])

    return (
        <>
            <Alert message={error} variant="error" showAlert={error !== ''} />
            <Alert message={message} variant="success" showAlert={message !== ''} />
            <SectionHeader title="Keywords" />
            {fetch && <Spinner />}

            {!fetch && data.length === 0 &&
                <NoResults
                    message="No Results"
                    withButton
                    path="/dashboard/create_keyword" />
            }

            {!fetch && data.length > 0 && <KeywordsList data={data} />}
        </>
    )
}

export default Keywords