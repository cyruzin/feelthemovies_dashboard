import React, { Component } from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import * as actions from '../../store/actions/RecommendationItemsActions'
import Alert from '../Layout/Alert'
import debounce from 'lodash/debounce'
import NoResults from '../Layout/NoResults';
import { getYear } from '../../util/helpers'

class RecommendationItemsList extends Component {

    constructor(props) {
        super(props)
        this.deleteMessage = debounce(this.deleteMessage, 2000)
    }

    componentDidMount() {
        this.fetchRecommendationItems()
        this.deleteMessage()
    }

    deleteMessage = () => {
        if (this.props.recommendationItems.deleted) {
            this.props.actions.setDeleteRecommendationItem(false)
        }
    }

    fetchRecommendationItems = () => {
        const { id } = this.props.match.params
        const { fetchRecommendationItems } = this.props.actions

        fetchRecommendationItems(id)
    }

    render() {
        const { loaded, items, deleted } = this.props.recommendationItems
        const { id } = this.props.match.params
        return (
            <div>
                <div className="container-fluid">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to='/dashboard/recommendations'>
                                Recommendations
                            </Link>
                        </li>
                        <li className="breadcrumb-item active">Items</li>
                    </ul>
                </div>
                {loaded && items.length > 0 ?
                    <section className="no-padding-top">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="block">
                                        {deleted ?
                                            <Alert
                                                type='success'
                                                message="Item removed successfully" />
                                            :
                                            null
                                        }
                                        <div className="table-responsive">
                                            <Link
                                                className="btn btn btn-outline-success mb-3 float-right"
                                                to={`/dashboard/create_item/${id}`}>
                                                New
                                            </Link>
                                            <table className="table table-striped table-sm">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Name</th>
                                                        <th>Year</th>
                                                        <th>Created at</th>
                                                        <th>Updated at</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {items.map(v => (
                                                        <tr key={v.id}>
                                                            <th scope="row">{v.id}</th>
                                                            <td>{v.name}</td>
                                                            <td>{getYear(v.year, false)}</td>
                                                            <td className="small">{v.created_at}</td>
                                                            <td className="small">{v.updated_at}</td>
                                                            <td>
                                                                <Link
                                                                    className="btn btn-sm btn-outline-secondary mr-2"
                                                                    to={`/dashboard/edit_item/${v.id}`}
                                                                >
                                                                    <i className="fa fa-edit"></i>
                                                                </Link>

                                                                <Link
                                                                    className="btn btn-sm btn-outline-danger"
                                                                    to={`/dashboard/delete_item/${v.id}`}
                                                                >
                                                                    <i className="fa fa-trash"></i>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    :
                    <NoResults
                        message="Empty recommendation"
                        withButton
                        path={`/dashboard/create_item/${id}`} />
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        recommendationItems: state.recommendationItems
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})


export default compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps))(RecommendationItemsList)
