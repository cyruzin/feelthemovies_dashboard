import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/RecommendationsActions'

class RecommendationsSearch extends Component {

    componentDidMount() {
        this.searchRecommendation()
    }

    searchRecommendation = () => {
        const params = new URLSearchParams(this.props.location.search);
        const query = params.get('q')
        this.props.actions.searchRecommendation(query)
    }

    render() {
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
                                                    <th>Status</th>
                                                    <th>Created at</th>
                                                    <th>Updated at</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.props.recommendations.search.map(recommendation => (
                                                    <tr key={recommendation.id}>
                                                        <th scope="row">{recommendation.id}</th>
                                                        <td>{recommendation.title}</td>
                                                        <td>{recommendation.status}</td>
                                                        <td className="small">
                                                            {recommendation.created_at}
                                                        </td>
                                                        <td className="small">
                                                            {recommendation.updated_at}
                                                        </td>
                                                        <td>
                                                            <Link
                                                                className="btn btn-sm btn-outline-success mr-2"
                                                                to={`/dashboard/items/${recommendation.id}`}
                                                            >
                                                                <i className="fa fa-plus"></i>
                                                            </Link>
                                                            <Link
                                                                className="btn btn-sm btn-outline-secondary mr-2"
                                                                to={`/dashboard/edit_recommendation/${recommendation.id}`}
                                                            >
                                                                <i className="fa fa-edit"></i>
                                                            </Link>

                                                            <Link
                                                                className="btn btn-sm btn-outline-danger"
                                                                to={`/dashboard/delete_recommendation/${recommendation.id}`}
                                                                onClick={() => this.props.actions.setDeleted(false)}
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

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        recommendations: state.recommendations
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RecommendationsSearch)