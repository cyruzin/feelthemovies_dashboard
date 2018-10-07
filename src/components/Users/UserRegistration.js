import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Alert from '../Layout/Alert'
import * as actions from '../../store/actions/UsersActions'

class UserRegistration extends Component {

    constructor(props) {
        super(props)
        this.nameRef = React.createRef()
        this.emailRef = React.createRef()
        this.passwordRef = React.createRef()
    }

    registerUser = () => {
        let name = this.nameRef.current.value;
        let email = this.emailRef.current.value;
        let password = this.passwordRef.current.value;

        let user = {
            name: name,
            email: email,
            password: password
        }

        if (name === '' || email === '' || password === '') {
            this.props.actions.setError('Please, fill all fields')
            return false
        }

        this.props.actions.registerUser(user)

        name = this.nameRef.current.value = ''
        email = this.emailRef.current.value = ''
        password = this.passwordRef.current.value = ''

    }

    render() {
        return (
            <div>
                <div className="container-fluid">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to='/dashboard/users'>
                                Users
                            </Link>
                        </li>
                        <li className="breadcrumb-item active">Registration</li>
                    </ul>
                </div>
                <section className="no-padding-top">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">

                                <div className="block">
                                    <div className="title">
                                        <strong>User registration</strong>
                                    </div>
                                    <div className="block-body">
                                        {this.props.users.error !== '' ?
                                            <Alert message={this.props.users.error} type='primary' />
                                            : null
                                        }
                                        {this.props.users.userRegister !== '' ?
                                            <Alert message={this.props.users.userRegister} type='success' />
                                            : null
                                        }
                                        <div className="form-group row">
                                            <label className="col-lg-3 form-control-label">Name</label>
                                            <div className="col-lg-9">
                                                <input ref={this.nameRef}
                                                    type="text"
                                                    className="form-control" />
                                            </div>
                                        </div>
                                        <div className="line"></div>

                                        <div className="form-group row">
                                            <label className="col-lg-3 form-control-label">E-mail</label>
                                            <div className="col-lg-9">
                                                <input ref={this.emailRef}
                                                    type="text"
                                                    className="form-control" />
                                            </div>
                                        </div>
                                        <div className="line"></div>

                                        <div className="form-group row">
                                            <label className="col-lg-3 form-control-label">Password</label>
                                            <div className="col-lg-9">
                                                <input ref={this.passwordRef}
                                                    type="password"
                                                    className="form-control" />
                                            </div>
                                        </div>
                                        <div className="line"></div>

                                        <div className="form-group row">
                                            <div className="col-sm-9 ml-auto">
                                                <button
                                                    onClick={this.registerUser}
                                                    className="btn btn-primary">
                                                    Save
                                                </button>
                                            </div>
                                        </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(UserRegistration)