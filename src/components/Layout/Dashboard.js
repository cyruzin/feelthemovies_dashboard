import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import Header from './Header'
import Content from './Content'
import Home from '../Home/Home'
import Users from '../Users/Users'
import Recommendations from '../Recommendations/Recommendations'
import Genres from '../Genres/Genres'
import Keywords from '../Keywords/Keywords'
import Sources from '../Sources/Sources'

class Dashboard extends Component {

    logout = () => {
        //   localStorage.clear()
    }

    render() {
        return (
            <div>
                <Header />
                <Content>
                    <Switch>
                        <Route path='/dashboard/home' component={Home} />
                        <Route path='/dashboard/users' component={Users} />
                        <Route path='/dashboard/recommendations' component={Recommendations} />
                        <Route path='/dashboard/genres' component={Genres} />
                        <Route path='/dashboard/keywords' component={Keywords} />
                        <Route path='/dashboard/sources' component={Sources} />
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