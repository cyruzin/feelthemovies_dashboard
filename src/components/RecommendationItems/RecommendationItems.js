import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/RecommendationItemsActions'
import RecommendationItemsList from './RecommendationItemsList'

class RecommendationItemsActions extends Component {

    render() {
        const { loaded } = this.props.recommendationItems
        return (
            <div>
                <div className="page-header">
                    <div className="container-fluid">
                        <h2 className="h5 no-margin-bottom">
                            Recommendation {this.props.match.params.id} - Items
                        </h2>
                    </div>
                </div>


                <RecommendationItemsList />


            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        recommendationItems: state.recommendationItems
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(RecommendationItemsActions)