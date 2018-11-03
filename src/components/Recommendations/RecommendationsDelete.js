import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import * as actions from '../../store/actions/RecommendationsActions'
import Modal from '../Layout/Modal'

class RecommendationsDelete extends PureComponent {

    deleteRecommendation = () => {
        const { id } = this.props.match.params
        const { deleteRecommendation } = this.props.actions
        deleteRecommendation(id)
    }

    isDeleted = () => {
        if (this.props.recommendations.deleted !== false) {
            return <Redirect to='/dashboard/recommendations' />
        }
    }

    render() {
        const { id } = this.props.match.params
        return (
            <div>
                {this.isDeleted()}
                <div className="container-fluid">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to='/dashboard/recommendations'>
                                Recommendations
                            </Link>
                        </li>
                        <li className="breadcrumb-item active">
                            Delete
                        </li>
                    </ul>
                </div>
                <Modal
                    message={`Are you sure that you want to 
                    remove recommedation ${id}?`}
                    cancelPath='/dashboard/recommendations'
                    action={this.deleteRecommendation} />
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

export default connect(
    mapStateToProps,
    mapDispatchToProps)(RecommendationsDelete)