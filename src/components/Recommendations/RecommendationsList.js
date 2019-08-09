// @flow
import React, { useState, useReducer, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { types, initialState, reducer } from './duck'
import { httpFetch } from '../../util/request'
import distanceInWordsStrict from 'date-fns/distance_in_words_strict'
import { checkType, checkStatus } from '../../util/helpers'
import {
    Section, SearchInput, Table, TR, TD,
    Modal, Button, Alert,
    Spinner, NoResults
} from '../Common'


function RecommendationsList () {
    const [recommendations, dispatch] = useReducer(reducer, initialState)
    const [modalShow, setModal] = useState(false)
    const [currentRecommendation, setCurrentRecommendation] = useState({})
    const tableColumns = [
        { key: 1, name: '#' },
        { key: 2, name: 'Title' },
        { key: 3, name: 'Type' },
        { key: 4, name: 'Status' },
        { key: 5, name: 'Created at' },
        { key: 6, name: 'Updated at' },
        { key: 7, name: 'Actions' }
    ]

    useEffect(() => {
        fetchRecommendations()
    }, [])

    /**
     * Lists the latest recommendations.
     */
    function fetchRecommendations () {
        dispatch({ type: types.FETCH })
        httpFetch({ method: 'GET', url: '/recommendations_admin' })
            .then(response => dispatch({ type: types.SUCCESS, payload: response.data }))
            .catch(error => dispatch({ type: types.FAILURE, payload: error.message }))
    }

    /** 
     * Deletes a recommendation.
     */
    function deleteRecommendation () {
        httpFetch({ method: 'DELETE', url: `/recommendation/${currentRecommendation.id}` })
            .then(response => {
                fetchRecommendations()
                dispatch({ type: types.REMOVE, payload: response.message })
            })
            .catch(error => dispatch({ type: types.FAILURE, payload: error.message }))
        setModal(false)
    }

    /**
     * Opens the modal.
     */
    function modalOpenHandler (recommendation: Object) {
        setCurrentRecommendation(recommendation)
        setModal(true)
    }

    /**
     * Closes the modal.
     */
    function modalCloseHandler () {
        setModal(false)
    }

    const { fetch, data, error, message } = recommendations

    return (
        <>
            <div className="page-header">
                <div className="container-fluid">
                    <h2 className="h5 no-margin-bottom">
                        Recommendations
                    </h2>
                </div>
            </div>

            {fetch && <Spinner />}

            {!fetch && data.length === 0 &&
                <NoResults
                    message="No Results"
                    withButton
                    path="/dashboard/create_recommendation" />}

            {!fetch && data.length > 0 &&
                <Section>
                    <Alert message={error} variant="error" showAlert={error !== ''} />
                    <Alert message={message} variant="success" showAlert={message !== ''} />
                    <Modal
                        show={modalShow}
                        title="Delete Recommendation"
                        okBtnName="Yes"
                        onClick={deleteRecommendation}
                        onClose={modalCloseHandler}>
                        <p>
                            Are you sure that you want to
                            delete recommendation
                           <strong>{currentRecommendation && currentRecommendation.title}</strong>?
                        </p>
                    </Modal>
                    <Link
                        className="btn btn-primary mb-3 float-right"
                        to='/dashboard/create_recommendation'>
                        New
                   </Link>
                    <SearchInput
                        path='/dashboard/search_recommendation'
                        placeholder="Search for a title, keyword or genre"
                    />
                    <Table columns={tableColumns}>
                        {data.map(recommendation => (
                            <TR key={recommendation.id}>
                                <TD>{recommendation.id}</TD>
                                <TD>{recommendation.title}</TD>
                                <TD>{checkType(recommendation.type)}</TD>
                                <TD>{checkStatus(recommendation.status)}</TD>
                                <TD>{distanceInWordsStrict(recommendation.created_at, Date.now())}</TD>
                                <TD>{distanceInWordsStrict(recommendation.updated_at, Date.now())}</TD>
                                <TD>
                                    <Link
                                        className="btn btn-sm btn-primary mr-2"
                                        to={`/dashboard/items/${recommendation.id}`}>
                                        <i className="fa fa-plus"></i>
                                    </Link>
                                    <Link
                                        className="btn btn-sm btn-primary mr-2"
                                        to={`/dashboard/edit_recommendation/${recommendation.id}`}>
                                        <i className="fa fa-edit"></i>
                                    </Link>
                                    <Button
                                        className="btn btn-sm btn-primary"
                                        onClick={() => modalOpenHandler(recommendation)}>
                                        <i className="fa fa-trash"></i>
                                    </Button>
                                </TD>
                            </TR>
                        ))}
                    </Table>
                </Section>}
        </>
    )
}

export default RecommendationsList