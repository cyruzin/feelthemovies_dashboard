import React, { Component } from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import * as actions from '../../store/actions/RecommendationsActions'
import Alert from '../Layout/Alert'
import debounce from 'lodash/debounce'
import moment from 'moment'
import NoResults from '../Layout/NoResults'
import Spinner from '../Layout/Spinner'
import { checkType, checkStatus } from '../../util/helpers'

class RecommendationsList extends Component {

    constructor(props) {
        super(props)

        this.deleteMessage = debounce(this.deleteMessage, 2000)
        this.searchRef = React.createRef()
    }

    componentDidMount () {
        this.deleteMessage()
        window.addEventListener('keypress', this.isEnterPressed)
    }

    componentWillUnmount () {
        window.removeEventListener('keypress', this.isEnterPressed)
    }

    deleteMessage = () => {
        if (this.props.recommendations.deleted) {
            this.props.actions.setRecommendationDeleted(false)
        }
    }

    isEnterPressed = e => {
        const { current } = this.searchRef
        if (e.keyCode === 13) {
            if (document.activeElement === current && current.value !== '') {
                this.props.history.push(`/dashboard/search_recommendation?query=${current.value}`)
            }
        }
    }

    render () {
        const { error, deleted, data, loaded } = this.props.recommendations
        return (
            <div>
                {loaded ? <Spinner /> : null}

                {!loaded && data.length > 0 ?
                    <section className="no-padding-top">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="block">
                                        {deleted ?
                                            <Alert
                                                type='success'
                                                message="Recommendation removed successfully"
                                            />
                                            :
                                            null
                                        }
                                        {error !== '' ?
                                            <Alert
                                                type='danger'
                                                message={error}
                                            />
                                            :
                                            null
                                        }
                                        <div className="table-responsive">
                                            <Link
                                                className="btn btn btn-outline-success mb-3 float-right"
                                                to='/dashboard/create_recommendation'>
                                                New
                                        </Link>
                                            <div className="form-group row">
                                                <div className="col-lg-6">
                                                    <input
                                                        ref={this.searchRef}
                                                        type="text"
                                                        placeholder="Search"
                                                        className="form-control" />
                                                </div>
                                            </div>
                                            <div className="line"></div>

                                            <table className="table table-striped table-sm">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Title</th>
                                                        <th>Type</th>
                                                        <th>Status</th>
                                                        <th>Created at</th>
                                                        <th>Updated at</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.map(r => (
                                                        <tr key={r.id}>
                                                            <th scope="row">{r.id}</th>
                                                            <td>{r.title}</td>
                                                            <td>{checkType(r.type)}</td>
                                                            <td>
                                                                {checkStatus(r.status)}
                                                            </td>
                                                            <td>
                                                                {moment(r.created_at).fromNow()}
                                                            </td>
                                                            <td>
                                                                {moment(r.updated_at).fromNow()}
                                                            </td>
                                                            <td>
                                                                <Link
                                                                    className="btn btn-sm btn-outline-success mr-2"
                                                                    to={`/dashboard/items/${r.id}`}
                                                                >
                                                                    <i className="fa fa-plus"></i>
                                                                </Link>
                                                                <Link
                                                                    className="btn btn-sm btn-outline-secondary mr-2"
                                                                    to={`/dashboard/edit_recommendation/${r.id}`}
                                                                >
                                                                    <i className="fa fa-edit"></i>
                                                                </Link>

                                                                <Link
                                                                    className="btn btn-sm btn-outline-danger"
                                                                    to={`/dashboard/delete_recommendation/${r.id}`}>
                                                                    <i className="fa fa-trash"></i>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    :
                    null
                }
                {!loaded && data.length === 0 ?
                    <NoResults
                        message="No recommendations were created yet"
                        withButton
                        path='/dashboard/create_recommendation' />
                    :
                    null}
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

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(RecommendationsList)