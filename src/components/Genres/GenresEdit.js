import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/GenresActions'
import { Link } from 'react-router-dom'
import Alert from '../Layout/Alert'

class GenresEdit extends Component {

    constructor(props) {
        super(props)
        this.nameRef = React.createRef()
    }

    componentDidMount() {
        this.reset()
        this.fetchSingleGenre()
    }

    fetchSingleGenre = () => {
        this.props.actions.fetchSingleGenre(this.props.match.params.id)
    }

    editGenre = () => {
        let genre = { name: this.nameRef.current.value }
        this.props.actions.editGenre(this.props.match.params.id, genre)
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
                            <Link to='/dashboard/genres'>Genres</Link>
                        </li>
                        <li className="breadcrumb-item active">Edit</li>
                    </ul>
                </div>
                <section className="no-padding-top">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">

                                {this.props.genres.editLoaded ?
                                    <div className="block">
                                        <div className="title">
                                            <strong>Genre edit</strong>
                                        </div>
                                        <div className="block-body">
                                            {this.props.genres.error !== '' ?
                                                <Alert message={this.props.genres.error} type='primary' />
                                                : null
                                            }
                                            {this.props.genres.edited !== false ?
                                                <Alert message={this.props.genres.edited} type='success' />
                                                : null
                                            }
                                            <div className="form-group row">
                                                <label className="col-sm-3 form-control-label">Name</label>
                                                <div className="col-sm-9">
                                                    <input ref={this.nameRef} type="text" className="form-control"
                                                        defaultValue={this.props.genres.genreData.name} />
                                                </div>
                                            </div>
                                            <div className="line"></div>

                                            <div className="form-group row">
                                                <div className="col-sm-9 ml-auto">
                                                    <button className="btn btn-primary"
                                                        onClick={this.editGenre}>
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
        genres: state.genres
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(GenresEdit)