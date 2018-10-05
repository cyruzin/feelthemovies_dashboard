import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import LoginInfo from './LoginInfo'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loadJs } from '../../util/helpers'
import * as actions from '../../store/actions/AuthActions'

class Auth extends Component {

    constructor(props) {
        super(props)
        this.emailRef = React.createRef()
        this.passwordRef = React.createRef()
    }

    componentDidMount = () => {
        window.addEventListener('keypress', this.isEnterPressed);
        loadJs()
        this.shouldClearError()
    }

    componentWillUnmount() {
        window.removeEventListener('keypress', this.isEnterPressed);
    }

    setEmail = () => this.props.actions.setEmail(this.emailRef.current.value)

    setPassword = () => this.props.actions.setPassword(this.passwordRef.current.value)

    fetchAuth = () => {
        const { value: email } = this.emailRef.current
        const { value: password } = this.passwordRef.current

        if (email === '' || password === '') {
            this.props.actions.setError('Please, complete all fields')
            return false
        }

        this.props.actions.fetchAuth(this.props.auth)
    }

    isEnterPressed = e => {
        if (e.keyCode === 13) {
            this.fetchAuth()
        }
    }

    shouldClearError = () => {
        if (this.props.auth.error !== '') {
            this.props.actions.setError('')
        }
    }

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