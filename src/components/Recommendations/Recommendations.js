import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/RecommendationsActions'
import RecommendationsList from './RecommendationsList'

class Recommendations extends Component {

    componentDidMount() {
        this.fetchRecommendations()
    }

    fetchRecommendations = () => {
        this.props.actions.fetchRecommendations()
    }

    render() {
        const { loaded } = this.props.recommendations
        return (
            <div>
                <div className="page-header">
                    <div className="container-fluid">
                        <h2 className="h5 no-margin-bottom">Recommendations</h2>
                    </div>
                </div>

                {loaded ?
                    <RecommendationsList />
                    :
                    null
                }
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        recommendations: state.recommendations
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Recommendations)