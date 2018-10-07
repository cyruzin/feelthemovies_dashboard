import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import * as actions from '../../store/actions/UsersActions'
import Modal from '../Layout/Modal'


class UserDelete extends Component {


    deleteUser = () => {
        this.props.actions.deleteUser(this.props.match.params.id)
    }

    isDeleted = () => {
        if (this.props.users.userDeleted !== '') {
            return <Redirect to='/dashboard/users' />
        }
    }

    render() {
        return (
            <div>
                {this.isDeleted()}
                <div className="container-fluid">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to='/dashboard/users'>Users</Link>
                        </li>
                        <li className="breadcrumb-item active">Delete</li>
                    </ul>
                </div>
                <Modal
                    message={`Are you sure that you want to 
                    remove user ${this.props.match.params.id}?`}
                    cancelPath='/dashboard/users'
                    action={this.deleteUser} />
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

export default connect(mapStateToProps, mapDispatchToProps)(UserDelete)