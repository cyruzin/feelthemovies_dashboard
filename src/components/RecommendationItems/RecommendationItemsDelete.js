import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/RecommendationItemsActions'
import { Redirect, Link } from 'react-router-dom'
import Modal from '../Layout/Modal'

class RecommendationItemsDelete extends Component {

    componentDidMount() {
        this.fetchRecommendationItem()
    }

    deleteRecommendationItem = () => {
        this.props.actions.deleteRecommendationItem(this.props.match.params.id)
    }

    isDeleted = () => {
        if (this.props.recommendationItems.deleted !== false) {
            const { recommendation_id } = this.props.recommendationItems.item
            return <Redirect to={`/dashboard/items/${recommendation_id}`} />
        }
    }

    fetchRecommendationItem = () => {
        this.props.actions.fetchRecommendationItem(this.props.match.params.id)
    }

    render() {
        const { recommendation_id } = this.props.recommendationItems.item
        return (
            <div>
                {this.isDeleted()}
                <div className="container-fluid">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to='/dashboard/recommendations'>Recommendation</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to={`/dashboard/items/${recommendation_id}`}>Recommendation Item</Link>
                        </li>
                        <li className="breadcrumb-item active">Delete</li>
                    </ul>
                </div>
                <Modal
                    message={`Are you sure that you want to 
                    remove item ${this.props.match.params.id}?`}
                    cancelPath={`/dashboard/items/${recommendation_id}`}
                    action={this.deleteRecommendationItem} />
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


export default connect(mapStateToProps, mapDispatchToProps)(RecommendationItemsDelete)