import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/RecommendationsActions'
import { Link } from 'react-router-dom'
import Alert from '../Layout/Alert'

class RecommendationsEdit extends Component {

    constructor(props) {
        super(props)
        this.nameRef = React.createRef()
    }

    componentDidMount() {
        this.reset()
        this.fetchSingleRecommendation()
    }

    fetchSingleRecommendation = () => {
        this.props.actions.fetchSingleRecommendation(this.props.match.params.id)
    }

    editRecommendation = () => {
        let recommendation = { name: this.nameRef.current.value }
        this.props.actions.editRecommendation(this.props.match.params.id, recommendation)
    }

    reset = () => {
        this.props.actions.setError('')
        this.props.actions.setEdited('')
    }

    render() {
        return (
            <div>
                <div className="container-fluid">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to='/dashboard/recommendations'>Recommendations</Link>
                        </li>
                        <li className="breadcrumb-item active">Edit</li>
                    </ul>
                </div>
                <section className="no-padding-top">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">

                                {this.props.recommendations.editLoaded ?
                                    <div className="block">
                                        <div className="title">
                                            <strong>Recommendation edit</strong>
                                        </div>
                                        <div className="block-body">
                                            {this.props.recommendations.error !== '' ?
                                                <Alert message={this.props.recommendations.error} type='primary' />
                                                : null
                                            }
                                            {this.props.recommendations.edited !== false ?
                                                <Alert message={this.props.recommendations.edited} type='success' />
                                                : null
                                            }
                                            <div className="form-group row">
                                                <label className="col-sm-3 form-control-label">Name</label>
                                                <div className="col-sm-9">
                                                    <input ref={this.nameRef} type="text" className="form-control"
                                                        defaultValue={this.props.recommendations.recommendationData.name} />
                                                </div>
                                            </div>
                                            <div className="line"></div>

                                            <div className="form-group row">
                                                <div className="col-sm-9 ml-auto">
                                                    <button className="btn btn-primary"
                                                        onClick={this.editRecommendation}>
                                                        Save
                                                </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    : null}
                            </div>
                        </div>
                    </div>
                </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(RecommendationsEdit)