import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getRecommendationItems } from '../../redux/ducks/recommendationItems'

import RecommendationItemsList from './RecommendationItemsList'

import {
    Alert,
    BreadCrumbs,
    NoResults,
    SectionHeader,
    Spinner
} from '../Common'

type Props = {
    match: Object
}

function RecommendationItems (props: Props) {
    const recommendationItems = useSelector(state => state.recommendationItems)
    const dispatch = useDispatch()
    const { id } = props.match.params
    const { fetch, data, error, message } = recommendationItems


    useEffect(() => {
        dispatch(getRecommendationItems(id))
    }, [dispatch, id])

    return (
        <>
            <Alert message={error} variant="error" showAlert={error !== ''} />
            <Alert message={message} variant="success" showAlert={message !== ''} />
            <SectionHeader title={`Recommendation ${id} - Items`} />

            {fetch && <Spinner />}

            {!fetch && data.length === 0 &&
                <>
                    <BreadCrumbs
                        breadCrumbs={[{
                            key: 1,
                            path: '/dashboard/recommendations',
                            name: 'Recommendations'
                        }]}
                        activeName="Items" />
                    <NoResults
                        message="Empty Recommendation"
                        withButton
                        path={`/dashboard/create_item/${id}`} />
                </>
            }

            {!fetch && data.length > 0 && <RecommendationItemsList data={data} id={id} />}
        </>
    )
}

export default RecommendationItems