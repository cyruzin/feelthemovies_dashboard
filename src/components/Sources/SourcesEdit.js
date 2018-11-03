import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/SourcesActions'
import { Link } from 'react-router-dom'
import Alert from '../Layout/Alert'

class SourcesEdit extends PureComponent {

    constructor(props) {
        super(props)
        this.nameRef = React.createRef()
    }

    componentDidMount() {
        this.reset()
        this.fetchSingleSource()
    }

    fetchSingleSource = () => {
        this.props.actions.fetchSingleSource(this.props.match.params.id)
    }

    editSource = () => {
        let source = { name: this.nameRef.current.value }
        this.props.actions.editSource(this.props.match.params.id, source)
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
                            <Link to='/dashboard/sources'>Sources</Link>
                        </li>
                        <li className="breadcrumb-item active">Edit</li>
                    </ul>
                </div>
                <section className="no-padding-top">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">

                                {this.props.sources.editLoaded ?
                                    <div className="block">
                                        <div className="title">
                                            <strong>Source edit</strong>
                                        </div>
                                        <div className="block-body">
                                            {this.props.sources.error !== '' ?
                                                <Alert message={this.props.sources.error} type='primary' />
                                                : null
                                            }
                                            {this.props.sources.edited !== false ?
                                                <Alert message={this.props.sources.edited} type='success' />
                                                : null
                                            }
                                            <div className="form-group row">
                                                <label className="col-sm-3 form-control-label">Name</label>
                                                <div className="col-sm-9">
                                                    <input ref={this.nameRef} type="text" className="form-control"
                                                        defaultValue={this.props.sources.sourceData.name} />
                                                </div>
                                            </div>
                                            <div className="line"></div>

                                            <div className="form-group row">
                                                <div className="col-sm-9 ml-auto">
                                                    <button className="btn btn-primary"
                                                        onClick={this.editSource}>
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
        sources: state.sources
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SourcesEdit)