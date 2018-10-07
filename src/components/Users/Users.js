import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/UsersActions'
import UserList from './UserList'

class Users extends Component {

    componentDidMount() {
        this.fetchUsers()
    }

    fetchUsers = () => {
        const { data, userDeleted, userEdited } = this.props.users

        if (data.length === 0 || userDeleted !== '' || userEdited !== '') {
            this.props.actions.fetchUsers(this.props.users)
        }
    }

    render() {
        const { listLoaded } = this.props.users
        return (
            <div>
                <div className="page-header">
                    <div className="container-fluid">
                        <h2 className="h5 no-margin-bottom">Users</h2>
                    </div>
                </div>
                {listLoaded ?
                    <UserList />
                    :
                    null
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

export default connect(mapStateToProps, mapDispatchToProps)(Users)