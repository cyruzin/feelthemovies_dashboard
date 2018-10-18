import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actions from '../../store/actions/KeywordsActions'
import Alert from '../Layout/Alert'
import debounce from 'lodash/debounce'

class KeywordsList extends Component {

    constructor(props) {
        super(props)

        this.deleteMessage = debounce(this.deleteMessage, 2000)
    }

    componentDidMount() {
        this.deleteMessage()
    }

    deleteMessage = () => {
        if (this.props.keywords.deleted) {
            this.props.actions.setDeleted('')
        }
    }


    render() {
        return (
            <div>
                <section className="no-padding-top">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="block">
                                    {this.props.keywords.deleted ?
                                        <Alert type='success' message="Keyword removed successfully" />
                                        :
                                        null
                                    }
                                    <div className="table-responsive">
                                        <Link
                                            className="btn btn btn-outline-success mb-3 float-right"
                                            to='/dashboard/create_keyword'>
                                            New
                                        </Link>
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
                                                {this.props.keywords.data.map(keyword => (
                                                    <tr key={keyword.id}>
                                                        <th scope="row">{keyword.id}</th>
                                                        <td>{keyword.name}</td>
                                                        <td>{keyword.created_at}</td>
                                                        <td>{keyword.updated_at}</td>
                                                        <td>
                                                            <Link
                                                                className="btn btn-sm btn-outline-secondary mr-2"
                                                                to={`/dashboard/edit_keyword/${keyword.id}`}
                                                            >
                                                                <i className="fa fa-edit"></i>
                                                            </Link>

                                                            <Link
                                                                className="btn btn-sm btn-outline-danger"
                                                                to={`/dashboard/delete_keyword/${keyword.id}`}
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
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        keywords: state.keywords
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(KeywordsList)