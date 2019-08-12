import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getGenres } from '../../redux/ducks/genres'

import GenresList from './GenresList'

import {
    Alert,
    NoResults,
    SectionHeader,
    Spinner,
} from '../Common'

function Genres () {
    const genres = useSelector(state => state.genres)
    const dispatch = useDispatch()
    const { fetch, data, error, message } = genres

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch])

    return (
        <>
            <Alert message={error} variant="error" showAlert={error !== ''} />
            <Alert message={message} variant="success" showAlert={message !== ''} />
            <SectionHeader title="Genres" />
            {fetch && <Spinner />}

            {!fetch && data.length === 0 &&
                <NoResults
                    message="No Results"
                    withButton
                    path="/dashboard/create_genre" />
            }

            {!fetch && data.length > 0 && <GenresList data={data} />}
        </>
    )
}

export default Genres