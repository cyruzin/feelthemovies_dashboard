import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSearchRecommendations } from '../../redux/ducks/recommendations'
import distanceInWordsStrict from 'date-fns/distance_in_words_strict'
import { checkType, checkStatus } from '../../util/helpers'
import Spinner from '../Layout/Spinner'
import NoResults from '../Layout/NoResults';

function RecommendationsSearch (props) {
    const dispatch = useDispatch()
    const recommendations = useSelector(state => state.recommendations)
    const { fetch, searchData } = recommendations

    useEffect(() => {
        const { query } = props.location.state
        dispatch(getSearchRecommendations(query))
    }, [dispatch, props.location.state])

    return (
        <div>
            <div className="container-fluid">
                <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to='/dashboard/recommendations'>
                            Recommendations
                        </Link>
                    </li>
                    <li className="breadcrumb-item active">Search</li>
                </ul>
            </div>
            {fetch && <Spinner />}

            {!fetch && searchData.length === 0 && <NoResults message="No Results" />}

            {!fetch && searchData.length > 0 &&
                <section className="no-padding-top">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="block">
                                    <div className="table-responsive">
                                        <table className="table table-striped table-sm">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Title</th>
                                                    <th>Type</th>
                                                    <th>Status</th>
                                                    <th>Created at</th>
                                                    <th>Updated at</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {searchData.map(recommendation => (
                                                    <tr key={recommendation.id}>
                                                        <td>{recommendation.id}</td>
                                                        <td>{recommendation.title}</td>
                                                        <td>{checkType(recommendation.type)}</td>
                                                        <td>{checkStatus(recommendation.status)}</td>
                                                        <td>{distanceInWordsStrict(recommendation.created_at, Date.now())}</td>
                                                        <td>{distanceInWordsStrict(recommendation.updated_at, Date.now())}</td>
                                                        <td>
                                                            <Link
                                                                className="btn btn-sm btn-outline-success mr-2"
                                                                to={`/dashboard/items/${recommendation.id}`}>
                                                                <i className="fa fa-plus"></i>
                                                            </Link>
                                                            <Link
                                                                className="btn btn-sm btn-outline-secondary mr-2"
                                                                to={`/dashboard/edit_recommendation/${recommendation.id}`}>
                                                                <i className="fa fa-edit"></i>
                                                            </Link>
                                                            <Link
                                                                className="btn btn-sm btn-outline-danger"
                                                                to={`/dashboard/delete_recommendation/${recommendation.id}`}>
                                                                <i className="fa fa-trash"></i>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </div>
    )
}

export default RecommendationsSearch