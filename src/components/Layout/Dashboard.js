import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import Header from './Header'
import Content from './Content'
import Home from '../Home/Home'
import Users from '../Users/Users'
import Recommendations from '../Recommendations/Recommendations'
import Genres from '../Genres/Genres'
import Keywords from '../Keywords/Keywords'
import Sources from '../Sources/Sources'
import Logout from '../Layout/Logout'


class Dashboard extends Component {

    render() {
        let authRedirect = null

        if (this.props.auth.authorized === false) {
            authRedirect = <Redirect to='/' />
        }

        return (
            <div>
                {authRedirect}
                <Header />
                <Content>
                    <Switch>
                        <Route path='/dashboard/home' component={Home} />
                        <Route path='/dashboard/users' component={Users} />
                        <Route path='/dashboard/recommendations' component={Recommendations} />
                        <Route path='/dashboard/genres' component={Genres} />
                        <Route path='/dashboard/keywords' component={Keywords} />
                        <Route path='/dashboard/sources' component={Sources} />
                        <Route path='/dashboard/logout' component={Logout} />
                    </Switch>
                </Content>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Dashboard)