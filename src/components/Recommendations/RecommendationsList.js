import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useReactRouter from 'use-react-router'
import distanceInWordsStrict from 'date-fns/distance_in_words_strict'
import { checkType, checkStatus } from '../../util/helpers'
import Search from '../Layout/Search'

function RecommendationsList (props) {
    const [searchKeyword, setSearchKeyword] = useState('')
    const { history } = useReactRouter()
    const { data } = props

    function getSearchKeyword (event) {
        setSearchKeyword(event.target.value)
    }

    function searchHandler () {
        if (searchKeyword === '') return false
        const { push } = history
        return push(
            `/dashboard/search_recommendation?query=${searchKeyword}`,
            { query: searchKeyword }
        )
    }

    return (
        <div>
            <section className="no-padding-top">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="block">
                                <div className="table-responsive">
                                    <Link
                                        className="btn btn btn-outline-success mb-3 float-right"
                                        to='/dashboard/create_recommendation'>
                                        New
                                    </Link>
                                    <Search
                                        placeholder="Search for keywords, genres or titles"
                                        onChange={getSearchKeyword}
                                        searchHandler={searchHandler} />
                                    <div className="line"></div>
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
                                            {data.map(recommendation => (
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
        </div >
    )
}

export default RecommendationsList