// @flow
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import distanceInWordsStrict from 'date-fns/distance_in_words_strict'

import {
    getSearchRecommendations,
    deleteRecommendations
} from '../../redux/ducks/recommendations'
import { checkType, checkStatus } from '../../util/helpers'

import {
    Button,
    BreadCrumbs,
    Modal,
    Section,
    SearchInput,
    Spinner,
    NoResults,
    Table,
    TR,
    TD
} from '../Common'

type Props = {
    location: Object,
    history: Object
}

function RecommendationsSearch (props: Props) {
    const dispatch = useDispatch()
    const [modalShow, setModal] = useState(false)
    const [recommendation, setRecommendation] = useState({})
    const recommendations = useSelector(state => state.recommendations)
    const { fetch, searchData } = recommendations
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
        const { query } = props.location.state
        dispatch(getSearchRecommendations(query))
    }, [dispatch, props.location.state])


    function modalOpenHandler (recommendation: Object) {
        setRecommendation(recommendation)
        setModal(true)
    }

    function modalCloseHandler () {
        setModal(false)
    }

    function deleteRecommendation () {
        dispatch(deleteRecommendations(recommendation.id))
        setModal(false)
        const { push } = props.history
        return push('/dashboard/recommendations')
    }

    return (
        <>
            <BreadCrumbs
                activeName="Search"
                breadCrumbs={[{
                    key: 1,
                    path: '/dashboard/recommendations',
                    name: 'Recommendations'
                }]} />

            {fetch && <Spinner />}

            {!fetch && searchData.length === 0 &&
                <Section>
                    <SearchInput
                        path='/dashboard/search_recommendation'
                        placeholder="Search for a title, keyword or genre"
                    />
                    <NoResults message="No Results" />
                </Section>}

            {!fetch && searchData.length > 0 &&
                <Section>
                    <Modal
                        show={modalShow}
                        title="Delete Recommendation"
                        okBtnName="Yes"
                        onClick={deleteRecommendation}
                        onClose={modalCloseHandler}>
                        <p>
                            Are you sure that you want to
                        delete recommendation <strong>{recommendation && recommendation.title}</strong>?
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
                        {searchData.map(recommendation => (
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

export default RecommendationsSearch