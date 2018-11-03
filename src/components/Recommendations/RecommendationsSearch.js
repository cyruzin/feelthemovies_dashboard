import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/RecommendationsActions'
import NoResults from '../Layout/NoResults';
import Spinner from '../Layout/Spinner'

class RecommendationsSearch extends PureComponent {

    componentDidMount() {
        this.searchRecommendation()
    }

    searchRecommendation = () => {
        const params = new URLSearchParams(this.props.location.search);
        const query = params.get('q')
        this.props.actions.searchRecommendation(query)
    }

    render() {
        const { search, searchLoaded } = this.props.recommendations
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
                {searchLoaded ? <Spinner /> : null}

                {!searchLoaded && search.length === 0 ?
                    <NoResults message="No Results" />
                    :
                    null
                }

                {!searchLoaded && search.length > 0 ?
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
                                                    {search.map(r => (
                                                        <tr key={r.id}>
                                                            <th scope="row">{r.id}</th>
                                                            <td>{r.title}</td>
                                                            <td>{r.status}</td>
                                                            <td className="small">
                                                                {r.created_at}
                                                            </td>
                                                            <td className="small">
                                                                {r.updated_at}
                                                            </td>
                                                            <td>
                                                                <Link
                                                                    className="btn btn-sm btn-outline-success mr-2"
                                                                    to={`/dashboard/items/${r.id}`}
                                                                >
                                                                    <i className="fa fa-plus"></i>
                                                                </Link>
                                                                <Link
                                                                    className="btn btn-sm btn-outline-secondary mr-2"
                                                                    to={`/dashboard/edit_recommendation/${r.id}`}
                                                                >
                                                                    <i className="fa fa-edit"></i>
                                                                </Link>

                                                                <Link
                                                                    className="btn btn-sm btn-outline-danger"
                                                                    to={`/dashboard/delete_recommendation/${r.id}`}
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
                    :
                    null
                }
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

export default connect(
    mapStateToProps,
    mapDispatchToProps)(RecommendationsSearch)