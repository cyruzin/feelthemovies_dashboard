import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/UsersActions'
import { Link } from 'react-router-dom'
import Alert from '../Layout/Alert'

class UserEdit extends Component {

    constructor(props) {
        super(props)
        this.nameRef = React.createRef()
        this.emailRef = React.createRef()
        this.passwordRef = React.createRef()
    }

    componentDidMount() {
        this.reset()
        this.fetchSingleUser()
    }

    fetchSingleUser = () => {
        this.props.actions.fetchSingleUser(this.props.match.params.id)
    }

    editUser = () => {
        let user = {
            name: this.nameRef.current.value,
            email: this.emailRef.current.value,
            password: this.passwordRef.current.value,
        }
        this.props.actions.editUser(this.props.match.params.id, user)

        this.passwordRef.current.value = ''
    }

    reset = () => {
        this.props.actions.setError('')
        this.props.actions.setEdited('')
    }

    render() {
        const { error, editLoaded, userEdited } = this.props.users
        const { name, email } = this.props.users.userData

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
                            Edit
                        </li>
                    </ul>
                </div>
                <section className="no-padding-top">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">

                                {editLoaded ?
                                    <div className="block">
                                        <div className="title">
                                            <strong>User edit</strong>
                                        </div>
                                        <div className="block-body">
                                            {error !== '' ?
                                                <Alert
                                                    message={error}
                                                    type='primary' />
                                                : null
                                            }
                                            {userEdited !== '' ?
                                                <Alert
                                                    message={userEdited}
                                                    type='success' />
                                                : null
                                            }
                                            <div className="form-group row">
                                                <label className="col-sm-3 form-control-label">
                                                    Name
                                                </label>
                                                <div className="col-sm-9">
                                                    <input
                                                        ref={this.nameRef}
                                                        type="text"
                                                        className="form-control"
                                                        defaultValue={name} />
                                                </div>
                                            </div>
                                            <div className="line"></div>

                                            <div className="form-group row">
                                                <label className="col-sm-3 form-control-label">
                                                    E-mail
                                                </label>
                                                <div className="col-sm-9">
                                                    <input
                                                        ref={this.emailRef}
                                                        type="text"
                                                        className="form-control"
                                                        defaultValue={email} />
                                                </div>
                                            </div>
                                            <div className="line"></div>

                                            <div className="form-group row">
                                                <label className="col-sm-3 form-control-label">
                                                    Password
                                                </label>
                                                <div className="col-sm-9">
                                                    <input
                                                        ref={this.passwordRef}
                                                        type="password"
                                                        className="form-control" />
                                                </div>
                                            </div>
                                            <div className="line"></div>

                                            <div className="form-group row">
                                                <div className="col-sm-9 ml-auto">
                                                    <button className="btn btn-primary"
                                                        onClick={this.editUser}>
                                                        Save
                                                </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    : null}
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

export default connect(
    mapStateToProps,
    mapDispatchToProps)(UserEdit)