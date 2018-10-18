import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actions from '../../store/actions/GenresActions'
import Alert from '../Layout/Alert'
import debounce from 'lodash/debounce'

class GenresList extends Component {

    constructor(props) {
        super(props)

        this.deleteMessage = debounce(this.deleteMessage, 2000)
    }

    componentDidMount() {
        this.deleteMessage()
    }

    deleteMessage = () => {
        if (this.props.genres.deleted) {
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
                                    {this.props.genres.deleted ?
                                        <Alert type='success' message="Genre removed successfully" />
                                        :
                                        null
                                    }
                                    <div className="table-responsive">
                                        <Link
                                            className="btn btn btn-outline-success mb-3 float-right"
                                            to='/dashboard/create_genre'>
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
                                                {this.props.genres.data.map(genre => (
                                                    <tr key={genre.id}>
                                                        <th scope="row">{genre.id}</th>
                                                        <td>{genre.name}</td>
                                                        <td className="small">{genre.created_at}</td>
                                                        <td className="small">{genre.updated_at}</td>
                                                        <td>
                                                            <Link
                                                                className="btn btn-sm btn-outline-secondary mr-2"
                                                                to={`/dashboard/edit_genre/${genre.id}`}
                                                            >
                                                                <i className="fa fa-edit"></i>
                                                            </Link>

                                                            <Link
                                                                className="btn btn-sm btn-outline-danger"
                                                                to={`/dashboard/delete_genre/${genre.id}`}
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
        genres: state.genres
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(GenresList)