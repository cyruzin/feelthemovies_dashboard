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
import Logout from '../Auth/Logout'
import { loadJs } from '../../util/helpers'
import UserRegistration from '../Users/UserRegistration';
import UserEdit from '../Users/UserEdit';
import UserDelete from '../Users/UserDelete';
import KeywordsCreate from '../Keywords/KeywordsCreate'
import KeywordsEdit from '../Keywords/KeywordsEdit'
import KeywordsDelete from '../Keywords/KeywordsDelete'

class Dashboard extends Component {

    componentDidMount() {
        loadJs()
    }

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
                        <Route path='/dashboard/create_user' component={UserRegistration} />
                        <Route path='/dashboard/edit_user/:id' component={UserEdit} />
                        <Route path='/dashboard/delete_user/:id' component={UserDelete} />

                        <Route path='/dashboard/create_keyword' component={KeywordsCreate} />
                        <Route path='/dashboard/edit_keyword/:id' component={KeywordsEdit} />
                        <Route path='/dashboard/delete_keyword/:id' component={KeywordsDelete} />

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