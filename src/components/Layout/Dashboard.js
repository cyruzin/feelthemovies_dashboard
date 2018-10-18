import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import Header from './Header'
import Content from './Content'
import Recommendations from '../Recommendations/Recommendations'
import RecommendationsCreate from '../Recommendations/RecommendationsCreate'
import RecommendationsEdit from '../Recommendations/RecommendationsEdit'
import RecommendationsDelete from '../Recommendations/RecommendationsDelete'
import RecommendationItems from '../RecommendationItems/RecommendationItems'
import Sources from '../Sources/Sources'
import SourcesCreate from '../Sources/SourcesCreate'
import SourcesEdit from '../Sources/SourcesEdit'
import SourcesDelete from '../Sources/SourcesDelete'
import Logout from '../Auth/Logout'
import Users from '../Users/Users'
import UserRegistration from '../Users/UserRegistration';
import UserEdit from '../Users/UserEdit';
import UserDelete from '../Users/UserDelete';
import Genres from '../Genres/Genres'
import GenresCreate from '../Genres/GenresCreate'
import GenresEdit from '../Genres/GenresEdit'
import GenresDelete from '../Genres/GenresDelete'
import Keywords from '../Keywords/Keywords'
import KeywordsCreate from '../Keywords/KeywordsCreate'
import KeywordsEdit from '../Keywords/KeywordsEdit'
import KeywordsDelete from '../Keywords/KeywordsDelete'
import { loadJs } from '../../util/helpers'
import RecommendationItemsCreate from '../RecommendationItems/RecommendationItemsCreate';
import RecommendationItemsEdit from '../RecommendationItems/RecommendationItemsEdit';
import RecommendationItemsDelete from '../RecommendationItems/RecommendationItemsDelete';
import RecommendationsSearch from '../Recommendations/RecommendationsSearch'

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
                        <Route path='/dashboard/users' component={Users} />
                        <Route path='/dashboard/create_user' component={UserRegistration} />
                        <Route path='/dashboard/edit_user/:id' component={UserEdit} />
                        <Route path='/dashboard/delete_user/:id' component={UserDelete} />

                        <Route path='/dashboard/recommendations' component={Recommendations} />
                        <Route path='/dashboard/create_recommendation' component={RecommendationsCreate} />
                        <Route path='/dashboard/edit_recommendation/:id' component={RecommendationsEdit} />
                        <Route path='/dashboard/delete_recommendation/:id' component={RecommendationsDelete} />
                        <Route path='/dashboard/search_recommendation' component={RecommendationsSearch} />

                        <Route path='/dashboard/items/:id' component={RecommendationItems} />
                        <Route path='/dashboard/create_item/:id' component={RecommendationItemsCreate} />
                        <Route path='/dashboard/edit_item/:id' component={RecommendationItemsEdit} />
                        <Route path='/dashboard/delete_item/:id' component={RecommendationItemsDelete} />

                        <Route path='/dashboard/genres' component={Genres} />
                        <Route path='/dashboard/create_genre' component={GenresCreate} />
                        <Route path='/dashboard/edit_genre/:id' component={GenresEdit} />
                        <Route path='/dashboard/delete_genre/:id' component={GenresDelete} />

                        <Route path='/dashboard/keywords' component={Keywords} />
                        <Route path='/dashboard/create_keyword' component={KeywordsCreate} />
                        <Route path='/dashboard/edit_keyword/:id' component={KeywordsEdit} />
                        <Route path='/dashboard/delete_keyword/:id' component={KeywordsDelete} />

                        <Route path='/dashboard/sources' component={Sources} />
                        <Route path='/dashboard/create_source' component={SourcesCreate} />
                        <Route path='/dashboard/edit_source/:id' component={SourcesEdit} />
                        <Route path='/dashboard/delete_source/:id' component={SourcesDelete} />

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