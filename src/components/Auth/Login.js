import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import LoginInfo from './LoginInfo'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../store/actions/AuthActions'

class Auth extends Component {

    constructor(props) {
        super(props)
        this.emailRef = React.createRef()
        this.passwordRef = React.createRef()
    }

    setEmail = () => this.props.actions.setEmail(this.emailRef.current.value)
    setPassword = () => this.props.actions.setPassword(this.passwordRef.current.value)
    fetchAuth = () => this.props.actions.fetchAuth(this.props.auth)

    render() {
        let authRedirect = null

        if (this.props.auth.authorized) {
            authRedirect = <Redirect to='/dashboard/home' />
        }

        return (
            <Fragment>
                {authRedirect}
                <LoginInfo
                    {...this.props}
                    emailRef={this.emailRef}
                    passwordRef={this.passwordRef}
                    setEmail={this.setEmail}
                    setPassword={this.setPassword}
                    fetchAuth={this.fetchAuth} />
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)