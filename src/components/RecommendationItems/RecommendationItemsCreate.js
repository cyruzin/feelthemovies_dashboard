import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/RecommendationItemsActions'

class RecommendationItemsCreate extends Component {

    componentDidMount() {

    }
    render() {
        return (
            <div>

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


export default connect(mapStateToProps, mapDispatchToProps)(RecommendationItemsCreate)