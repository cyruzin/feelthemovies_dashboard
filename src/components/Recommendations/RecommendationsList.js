import React from 'react'
import { Link } from 'react-router-dom'
import distanceInWordsStrict from 'date-fns/distance_in_words_strict'
import { checkType, checkStatus } from '../../util/helpers'
import Section from '../Common/Section'
import SearchInput from '../Common/SearchInput'
import Table from '../Common/Table'
import TR from '../Common/TR'
import TD from '../Common/TD'

function RecommendationsList (props) {
    const { data } = props
    const tableColumns = [
        { key: 1, name: '#' },
        { key: 2, name: 'Title' },
        { key: 3, name: 'Type' },
        { key: 4, name: 'Status' },
        { key: 5, name: 'Created at' },
        { key: 6, name: 'Updated at' },
        { key: 7, name: 'Actions' }
    ]

    return (
        <Section>
            <Link
                className="btn btn btn-outline-success mb-3 float-right"
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
                        </TD>
                    </TR>
                ))}
            </Table>
        </Section>
    )
}

export default RecommendationsList