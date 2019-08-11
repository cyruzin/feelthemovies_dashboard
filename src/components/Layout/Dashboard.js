import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'

import { loadJs } from '../../util/helpers'

import Header from './Header'
import Content from './Content'

import Recommendations from '../Recommendations/Recommendations'
import RecommendationsCreate from '../Recommendations/RecommendationsCreate'
import RecommendationsEdit from '../Recommendations/RecommendationsEdit'
import RecommendationsSearch from '../Recommendations/RecommendationsSearch'

import RecommendationItems from '../RecommendationItems/RecommendationItems'
import RecommendationItemsCreate from '../RecommendationItems/RecommendationItemsCreate'
import RecommendationItemsEdit from '../RecommendationItems/RecommendationItemsEdit'

// import Users from '../Users/Users'
// import UserRegistration from '../Users/UserRegistration';
// import UserEdit from '../Users/UserEdit';
// import UserSearch from '../Users/UserSearch'

import Genres from '../Genres/Genres'
import GenresCreate from '../Genres/GenresCreate'
import GenresEdit from '../Genres/GenresEdit'
import GenresSearch from '../Genres/GenresSearch'

// import Keywords from '../Keywords/Keywords'
// import KeywordsCreate from '../Keywords/KeywordsCreate'
// import KeywordsEdit from '../Keywords/KeywordsEdit'
// import KeywordsSearch from '../Keywords/KeywordsSearch'

// import Sources from '../Sources/Sources'
// import SourcesCreate from '../Sources/SourcesCreate'
// import SourcesEdit from '../Sources/SourcesEdit'
// import SourcesSearch from '../Sources/SourcesSearch'

import Logout from '../Authentication/Logout'

function Dashboard () {
    useEffect(() => {
        loadJs()
    }, [])

    return (
        <>
            <Header />
            <Content>
                <Switch>
                    <Route path='/dashboard/recommendations' component={Recommendations} />
                    <Route path='/dashboard/create_recommendation' component={RecommendationsCreate} />
                    <Route path='/dashboard/edit_recommendation/:id' component={RecommendationsEdit} />
                    <Route path='/dashboard/search_recommendation' component={RecommendationsSearch} />

                    <Route path='/dashboard/items/:id' component={RecommendationItems} />
                    <Route path='/dashboard/create_item/:id' component={RecommendationItemsCreate} />
                    <Route path='/dashboard/edit_item/:id' component={RecommendationItemsEdit} />

                    {/* <Route path='/dashboard/users' component={Users} />
                    <Route path='/dashboard/create_user' component={UserRegistration} />
                    <Route path='/dashboard/edit_user/:id' component={UserEdit} />
                    <Route path='/dashboard/search_user' component={UserSearch} /> */}

                    <Route path='/dashboard/genres' component={Genres} />
                    <Route path='/dashboard/create_genre' component={GenresCreate} />
                    <Route path='/dashboard/edit_genre/:id' component={GenresEdit} />
                    <Route path='/dashboard/search_genre' component={GenresSearch} />

                    {/* <Route path='/dashboard/keywords' component={Keywords} />
                    <Route path='/dashboard/create_keyword' component={KeywordsCreate} />
                    <Route path='/dashboard/edit_keyword/:id' component={KeywordsEdit} />
                    <Route path='/dashboard/search_keyword' component={KeywordsSearch} />

                    <Route path='/dashboard/sources' component={Sources} />
                    <Route path='/dashboard/create_source' component={SourcesCreate} />
                    <Route path='/dashboard/edit_source/:id' component={SourcesEdit} />
                    <Route path='/dashboard/search_source' component={SourcesSearch} /> */}

                    <Route path='/dashboard/logout' component={Logout} />
                </Switch>
            </Content>
        </>
    )
}

export default Dashboard