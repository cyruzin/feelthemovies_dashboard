import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/UsersActions'
import { Link } from 'react-router-dom'
import Alert from '../Layout/Alert'

class UserList extends Component {

    render() {
        return (
            <div>
                <section className="no-padding-top">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="block">
                                    {this.props.users.userDeleted !== '' ?
                                        <Alert type='success' message={this.props.users.userDeleted} />
                                        :
                                        null
                                    }
                                    <div className="table-responsive">
                                        <Link
                                            className="btn btn btn-outline-success mb-3 float-right"
                                            to='/dashboard/create_user'>
                                            New
                                </Link>
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
                                                {this.props.users.data.map(user => (
                                                    <tr key={user.id}>
                                                        <th scope="row">{user.id}</th>
                                                        <td>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.created_at}</td>
                                                        <td>{user.updated_at}</td>
                                                        <td>
                                                            <Link
                                                                className="btn btn-sm btn-outline-secondary mr-2"
                                                                to={`/dashboard/edit_user/${user.id}`}
                                                            >
                                                                <i className="fa fa-edit"></i>
                                                            </Link>

                                                            <Link
                                                                className="btn btn-sm btn-outline-danger"
                                                                to={`/dashboard/delete_user/${user.id}`}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserList)