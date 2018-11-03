import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/KeywordsActions'
import { Link } from 'react-router-dom'
import Alert from '../Layout/Alert'

class KeywordsEdit extends PureComponent {

    constructor(props) {
        super(props)
        this.nameRef = React.createRef()
    }

    componentDidMount() {
        this.reset()
        this.fetchSingleKeyword()
    }

    fetchSingleKeyword = () => {
        this.props.actions.fetchSingleKeyword(this.props.match.params.id)
    }

    editKeyword = () => {
        let keyword = { name: this.nameRef.current.value }
        this.props.actions.editKeyword(this.props.match.params.id, keyword)
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
                            <Link to='/dashboard/keywords'>Keywords</Link>
                        </li>
                        <li className="breadcrumb-item active">Edit</li>
                    </ul>
                </div>
                <section className="no-padding-top">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">

                                {this.props.keywords.editLoaded ?
                                    <div className="block">
                                        <div className="title">
                                            <strong>Keyword edit</strong>
                                        </div>
                                        <div className="block-body">
                                            {this.props.keywords.error !== '' ?
                                                <Alert message={this.props.keywords.error} type='primary' />
                                                : null
                                            }
                                            {this.props.keywords.edited !== false ?
                                                <Alert message={this.props.keywords.edited} type='success' />
                                                : null
                                            }
                                            <div className="form-group row">
                                                <label className="col-sm-3 form-control-label">Name</label>
                                                <div className="col-sm-9">
                                                    <input ref={this.nameRef} type="text" className="form-control"
                                                        defaultValue={this.props.keywords.keywordData.name} />
                                                </div>
                                            </div>
                                            <div className="line"></div>

                                            <div className="form-group row">
                                                <div className="col-sm-9 ml-auto">
                                                    <button className="btn btn-primary"
                                                        onClick={this.editKeyword}>
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
        keywords: state.keywords
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(KeywordsEdit)