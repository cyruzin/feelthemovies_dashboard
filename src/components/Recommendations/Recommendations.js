import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/RecommendationsActions'
import RecommendationsList from './RecommendationsList'

class Recommendations extends PureComponent {

    componentDidMount() {
        this.props.actions.fetchRecommendations()
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="container-fluid">
                        <h2 className="h5 no-margin-bottom">
                            Recommendations
                        </h2>
                    </div>
                </div>
                <RecommendationsList />
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        recommendations: state.recommendations,
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps)(Recommendations)