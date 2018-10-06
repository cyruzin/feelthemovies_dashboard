import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/UsersActions'
import UserList from './UserList'
import UserRegistration from './UserRegistration'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class Users extends Component {

    componentDidMount() {
        this.props.actions.fetchUsers(this.props.users)
    }

    listUsers = () => {
        this.props.actions.listLoaded(true)
        this.props.actions.createUser(false)
    }

    createUser = () => {
        this.props.actions.listLoaded(false)
        this.props.actions.createUser(true)
    }

    render() {
        const { listLoaded, createUserLoaded } = this.props.users
        return (
            <div>
                <div className="page-header">
                    <div className="container-fluid">
                        <h2 className="h5 no-margin-bottom">Users</h2>
                    </div>
                </div>
                {listLoaded ?
                    <UserList
                        data={this.props.users.data}
                        createUser={this.createUser} />
                    :
                    null
                }
                {createUserLoaded ?
                    <ReactCSSTransitionGroup
                        transitionName="smooth"
                        transitionAppear={true}
                        transitionAppearTimeout={1000}
                        transitionEnter={false}
                        transitionLeave={false}>
                        <UserRegistration
                            key={Date.now()}
                            listUsers={this.listUsers} />
                    </ReactCSSTransitionGroup>
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