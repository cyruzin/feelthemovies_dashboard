import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/KeywordsActions'
import NoResults from '../Layout/NoResults'
import Spinner from '../Layout/Spinner'
import moment from 'moment'

class KeywordsSearch extends Component {

    componentDidMount() {
        this.searchKeywords()
    }

    searchKeywords = () => {
        const params = new URLSearchParams(this.props.location.search);
        const query = params.get('q')
        this.props.actions.searchKeywords(query)
    }

    render() {
        const { searchLoaded, keywords } = this.props.keywords
        return (
            <div>
                <div className="container-fluid">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to='/dashboard/keywords'>
                                Keywords
                            </Link>
                        </li>
                        <li className="breadcrumb-item active">Search</li>
                    </ul>
                </div>
                {searchLoaded ? <Spinner /> : null}

                {!searchLoaded && keywords.length === 0 ?
                    <NoResults message="No Results" />
                    :
                    null
                }

                {!searchLoaded && keywords.length > 0 ?
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
                                                    {keywords.map(k => (
                                                        <tr key={k.id}>
                                                            <th scope="row">{k.id}</th>
                                                            <td>{k.name}</td>
                                                            <td>
                                                                {moment(k.created_at).fromNow()}
                                                            </td>
                                                            <td>
                                                                {moment(k.updated_at).fromNow()}
                                                            </td>
                                                            <td>
                                                                <Link
                                                                    className="btn btn-sm btn-outline-secondary mr-2"
                                                                    to={`/dashboard/edit_keyword/${k.id}`}
                                                                >
                                                                    <i className="fa fa-edit"></i>
                                                                </Link>

                                                                <Link
                                                                    className="btn btn-sm btn-outline-danger"
                                                                    to={`/dashboard/delete_keyword/${k.id}`}
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
        keywords: state.keywords
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(KeywordsSearch)