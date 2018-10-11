import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Alert from '../Layout/Alert'
import * as actions from '../../store/actions/SourcesActions'

class SourcesCreate extends Component {

    constructor(props) {
        super(props)
        this.nameRef = React.createRef()
    }

    componentDidMount() {
        if (this.props.sources.created) {
            this.props.actions.setCreateSource(false)
        }
    }

    createSource = () => {
        let name = this.nameRef.current.value

        this.props.actions.setCreateSource(false)

        let source = {
            name: name
        }

        if (name === '') {
            this.props.actions.setError('Please, fill name field')
            return false
        }

        this.props.actions.createSource(source)

        name = this.nameRef.current.value = ''
    }

    render() {
        return (
            <div>
                <div className="container-fluid">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to='/dashboard/sources'>
                                Sources
                            </Link>
                        </li>
                        <li className="breadcrumb-item active">Create</li>
                    </ul>
                </div>
                <section className="no-padding-top">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">

                                <div className="block">
                                    <div className="title">
                                        <strong>Create source</strong>
                                    </div>
                                    <div className="block-body">
                                        {this.props.sources.error !== '' ?
                                            <Alert message={this.props.sources.error} type='primary' />
                                            : null
                                        }
                                        {this.props.sources.created ?
                                            <Alert message="Genre created successfully" type='success' />
                                            : null
                                        }
                                        <div className="form-group row">
                                            <label className="col-lg-3 form-control-label">Name</label>
                                            <div className="col-lg-9">
                                                <input ref={this.nameRef}
                                                    type="text"
                                                    className="form-control" />
                                            </div>
                                        </div>
                                        <div className="line"></div>

                                        <div className="form-group row">
                                            <div className="col-sm-9 ml-auto">
                                                <button
                                                    onClick={this.createSource}
                                                    className="btn btn-primary">
                                                    Save
                                                </button>
                                            </div>
                                        </div>

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
        sources: state.sources
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SourcesCreate)