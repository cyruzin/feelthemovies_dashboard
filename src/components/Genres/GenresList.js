import React, { Component } from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import * as actions from '../../store/actions/GenresActions'
import Alert from '../Layout/Alert'
import debounce from 'lodash/debounce'
import NoResults from '../Layout/NoResults'

class GenresList extends Component {

    constructor(props) {
        super(props)

        this.deleteMessage = debounce(this.deleteMessage, 2000)
        this.searchGenresRef = React.createRef()
    }

    componentDidMount() {
        this.deleteMessage()
        window.addEventListener('keypress', this.isEnterPressed)
    }

    componentWillUnmount() {
        window.removeEventListener('keypress', this.isEnterPressed)
    }
    deleteMessage = () => {
        if (this.props.genres.deleted) {
            this.props.actions.setDeleted('')
        }
    }

    isEnterPressed = e => {
        const { current } = this.searchGenresRef
        if (e.keyCode === 13) {
            if (document.activeElement === current && current.value !== '') {
                this.props.history.push(`/dashboard/search_genre?q=${current.value}`)
            }
        }
    }

    render() {
        const { data, deleted } = this.props.genres
        return (
            <div>
                {data.length > 0 ?
                    <section className="no-padding-top">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="block">
                                        {deleted ?
                                            <Alert
                                                type='success'
                                                message="Genre removed successfully" />
                                            :
                                            null
                                        }
                                        <div className="table-responsive">
                                            <Link
                                                className="btn btn btn-outline-success mb-3 float-right"
                                                to='/dashboard/create_genre'>
                                                New
                                        </Link>
                                            <div className="form-group row">
                                                <div className="col-lg-6">
                                                    <input
                                                        ref={this.searchGenresRef}
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
                                                    {data.map(genre => (
                                                        <tr key={genre.id}>
                                                            <th scope="row">{genre.id}</th>
                                                            <td>{genre.name}</td>
                                                            <td className="small">
                                                                {genre.created_at}
                                                            </td>
                                                            <td className="small">
                                                                {genre.updated_at}
                                                            </td>
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
                    :
                    null
                }
                {data.length === 0 ?
                    <NoResults
                        message="No genres were created yet"
                        withButton
                        path='/dashboard/create_genre' />
                    :
                    null}
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

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps))(GenresList)