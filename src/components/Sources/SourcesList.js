import React, { Component } from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import * as actions from '../../store/actions/SourcesActions'
import Alert from '../Layout/Alert'
import debounce from 'lodash/debounce'
import moment from 'moment'
import NoResults from '../Layout/NoResults'
import Spinner from '../Layout/Spinner'

class SourcesList extends Component {

    constructor(props) {
        super(props)

        this.deleteMessage = debounce(this.deleteMessage, 2000)
        this.searchSourceRef = React.createRef()
    }

    componentDidMount() {
        this.deleteMessage()
        window.addEventListener('keypress', this.isEnterPressed)
    }

    componentWillUnmount() {
        window.removeEventListener('keypress', this.isEnterPressed)
    }

    deleteMessage = () => {
        if (this.props.sources.deleted) {
            this.props.actions.setDeleted('')
        }
    }

    isEnterPressed = e => {
        const { current } = this.searchSourceRef
        if (e.keyCode === 13) {
            if (document.activeElement === current && current.value !== '') {
                this.props.history.push(`/dashboard/search_source?q=${current.value}`)
            }
        }
    }


    render() {
        const { data, deleted, loaded } = this.props.sources
        return (
            <div>
                {loaded ? <Spinner /> : null}

                {!loaded && data.length > 0 ?
                    < section className="no-padding-top">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="block">
                                        {deleted ?
                                            <Alert type='success' message="Source removed successfully" />
                                            :
                                            null
                                        }
                                        <div className="table-responsive">
                                            <Link
                                                className="btn btn btn-outline-success mb-3 float-right"
                                                to='/dashboard/create_source'>
                                                New
                                        </Link>
                                            <div className="form-group row">
                                                <div className="col-lg-6">
                                                    <input
                                                        ref={this.searchSourceRef}
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
                                                        <th>Name</th>
                                                        <th>Created at</th>
                                                        <th>Updated at</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.map(source => (
                                                        <tr key={source.id}>
                                                            <th scope="row">{source.id}</th>
                                                            <td>{source.name}</td>
                                                            <td>
                                                                {moment(source.created_at).fromNow()}
                                                            </td>
                                                            <td>
                                                                {moment(source.updated_at).fromNow()}
                                                            </td>
                                                            <td>
                                                                <Link
                                                                    className="btn btn-sm btn-outline-secondary mr-2"
                                                                    to={`/dashboard/edit_source/${source.id}`}
                                                                >
                                                                    <i className="fa fa-edit"></i>
                                                                </Link>

                                                                <Link
                                                                    className="btn btn-sm btn-outline-danger"
                                                                    to={`/dashboard/delete_source/${source.id}`}
                                                                    onClick={() => this.props.actions.setDeleted(false)}
                                                                >
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
                        message="No sources were created yet"
                        withButton
                        path='/dashboard/create_source' />
                    :
                    null
                }

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        sources: state.sources
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps))(SourcesList)