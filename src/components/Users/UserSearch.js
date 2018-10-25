import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/UsersActions'
import NoResults from '../Layout/NoResults'

class UserSearch extends Component {

    componentDidMount() {
        this.searchUsers()
    }

    searchUsers = () => {
        const params = new URLSearchParams(this.props.location.search);
        const query = params.get('q')
        this.props.actions.searchUsers(query)
    }

    render() {
        const { search, searchLoaded } = this.props.users
        return (
            <div>
                <div className="container-fluid">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to='/dashboard/users'>
                                Users
                            </Link>
                        </li>
                        <li className="breadcrumb-item active">
                            Search
                        </li>
                    </ul>
                </div>
                {searchLoaded && search.length > 0 ?
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
                                                        <th>E-mail</th>
                                                        <th>Created at</th>
                                                        <th>Updated at</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {search.map(u => (
                                                        <tr key={u.id}>
                                                            <th scope="row">{u.id}</th>
                                                            <td>{u.name}</td>
                                                            <td>{u.email}</td>
                                                            <td className="small">
                                                                {u.created_at}
                                                            </td>
                                                            <td className="small">
                                                                {u.updated_at}
                                                            </td>
                                                            <td>
                                                                <Link
                                                                    className="btn btn-sm btn-outline-secondary mr-2"
                                                                    to={`/dashboard/edit_user/${u.id}`}
                                                                >
                                                                    <i className="fa fa-edit"></i>
                                                                </Link>

                                                                <Link
                                                                    className="btn btn-sm btn-outline-danger"
                                                                    to={`/dashboard/delete_user/${u.id}`}
                                                                    onClick={() => this.props.actions.setDeleted('')}
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
                    <NoResults message="No Results" />
                }

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps)(UserSearch)