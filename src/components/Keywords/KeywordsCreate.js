import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Alert from '../Layout/Alert'
import * as actions from '../../store/actions/KeywordsActions'

class KeywordsCreate extends PureComponent {

    constructor(props) {
        super(props)
        this.nameRef = React.createRef()
    }

    componentDidMount() {
        this.reset()
    }

    reset = () => {
        const { error, created } = this.props.keywords
        const { setError, setCreateKeyword } = this.props.actions

        if (created) {
            setCreateKeyword(false)
        }

        if (error !== '') {
            setError('')
        }
    }

    createKeyword = () => {
        let name = this.nameRef.current.value

        this.props.actions.setCreateKeyword(false)

        let keyword = {
            name: name
        }

        if (name === '') {
            this.props.actions.setError('Please, fill name field')
            return false
        }

        this.props.actions.createKeyword(keyword)

        name = this.nameRef.current.value = ''
        this.nameRef.current.focus()
    }

    render() {
        return (
            <div>
                <div className="container-fluid">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to='/dashboard/keywords'>
                                Keywords
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
                                        <strong>Create keyword</strong>
                                    </div>
                                    <div className="block-body">
                                        {this.props.keywords.error !== '' ?
                                            <Alert message={this.props.keywords.error} type='primary' />
                                            : null
                                        }
                                        {this.props.keywords.created ?
                                            <Alert message="Keyword created successfully" type='success' />
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
                                                    onClick={this.createKeyword}
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
        keywords: state.keywords
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(KeywordsCreate)