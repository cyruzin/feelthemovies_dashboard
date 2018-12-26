import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import * as actions from '../../store/actions/GenresActions'
import Modal from '../Layout/Modal'


class GenresDelete extends Component {


    deleteGenre = () => {
        this.props.actions.deleteGenre(this.props.match.params.id)
    }

    isDeleted = () => {
        if (this.props.genres.deleted !== false) {
            return <Redirect to='/dashboard/genres' />
        }
    }

    render() {
        return (
            <div>
                {this.isDeleted()}
                <div className="container-fluid">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to='/dashboard/genres'>Genres</Link>
                        </li>
                        <li className="breadcrumb-item active">Delete</li>
                    </ul>
                </div>
                <Modal
                    message={`Are you sure that you want to 
                    remove genre ${this.props.match.params.id}?`}
                    cancelPath='/dashboard/genres'
                    action={this.deleteGenre} />
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

export default connect(mapStateToProps, mapDispatchToProps)(GenresDelete)