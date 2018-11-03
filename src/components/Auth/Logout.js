import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as actions from '../../store/actions/AuthActions'

class Logout extends PureComponent {

    componentDidMount() {
        this.props.actions.logout()
    }

    render() {
        return <Redirect to='/' />
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

export default connect(mapStateToProps, mapDispatchToProps)(Logout)