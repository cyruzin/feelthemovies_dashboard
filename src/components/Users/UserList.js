import React, { Component } from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/UsersActions'
import { Link, withRouter } from 'react-router-dom'
import Alert from '../Layout/Alert'
import debounce from 'lodash/debounce'

class UserList extends Component {

    constructor(props) {
        super(props)

        this.deleteMessage = debounce(this.deleteMessage, 2000)
        this.searchUserRef = React.createRef()
    }

    componentDidMount() {
        this.deleteMessage()
        window.addEventListener('keypress', this.isEnterPressed)
    }

    componentWillUnmount() {
        window.removeEventListener('keypress', this.isEnterPressed)
    }

    deleteMessage = () => {
        if (this.props.users.userDeleted !== '') {
            this.props.actions.setDeleted('')
        }
    }

    isEnterPressed = e => {
        const { current } = this.searchUserRef
        if (e.keyCode === 13) {
            if (document.activeElement === current && current.value !== '') {
                this.props.history.push(`/dashboard/search_user?q=${current.value}`)
            }
        }
    }

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
                                        <div className="form-group row">
                                            <div className="col-lg-6">
                                                <input
                                                    ref={this.searchUserRef}
                                                    type="text"
                                                    placeholder="Search"
                                                    className="form-control" />
                                            </div>
                                        </div>
                                        <div className="line"></div>
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
                                                        <td className="small">{user.created_at}</td>
                                                        <td className="small">{user.updated_at}</td>
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

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps))(UserList)