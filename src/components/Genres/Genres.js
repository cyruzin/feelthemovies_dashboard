import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/GenresActions'
import GenresList from './GenresList'

class Genres extends Component {

    componentDidMount() {
        !this.props.genres.data.length && this.props.actions.fetchGenres()
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="container-fluid">
                        <h2 className="h5 no-margin-bottom">Genres</h2>
                    </div>
                </div>
                <GenresList />
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(Genres)