import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRecommendations } from '../../redux/ducks/recommendations'
import RecommendationsList from './RecommendationsList'
import { Spinner, NoResults } from '../Common'

function Recommendations () {
    const recommendations = useSelector(state => state.recommendations)
    const dispatch = useDispatch()
    const { fetch, data } = recommendations

    useEffect(() => {
        dispatch(getRecommendations())
    }, [dispatch])

    return (
        <div>
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
                    path="/dashboard/create_recommendation" />
            }

            {!fetch && data.length > 0 && <RecommendationsList data={data} />}
        </div>
    )
}

export default Recommendations