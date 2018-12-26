import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/SourcesActions'
import NoResults from '../Layout/NoResults'
import Spinner from '../Layout/Spinner'

class SourcesSearch extends Component {

    componentDidMount() {
        this.searchSources()
    }

    searchSources = () => {
        const params = new URLSearchParams(this.props.location.search);
        const query = params.get('q')
        this.props.actions.searchSources(query)
    }

    render() {
        const { searchLoaded, search } = this.props.sources
        return (
            <div>
                <div className="container-fluid">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to='/dashboard/sources'>
                                Sources
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
                                                        <th>Name</th>
                                                        <th>Created at</th>
                                                        <th>Updated at</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {search.map(s => (
                                                        <tr key={s.id}>
                                                            <th scope="row">{s.id}</th>
                                                            <td>{s.name}</td>
                                                            <td className="small">
                                                                {s.created_at}
                                                            </td>
                                                            <td className="small">
                                                                {s.updated_at}
                                                            </td>
                                                            <td>
                                                                <Link
                                                                    className="btn btn-sm btn-outline-secondary mr-2"
                                                                    to={`/dashboard/edit_source/${s.id}`}
                                                                >
                                                                    <i className="fa fa-edit"></i>
                                                                </Link>

                                                                <Link
                                                                    className="btn btn-sm btn-outline-danger"
                                                                    to={`/dashboard/delete_source/${s.id}`}
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
        sources: state.sources
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps)(SourcesSearch)