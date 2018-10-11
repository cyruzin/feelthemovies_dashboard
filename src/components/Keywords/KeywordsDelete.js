import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import * as actions from '../../store/actions/KeywordsActions'
import Modal from '../Layout/Modal'


class KeywordsDelete extends Component {


    deleteKeyword = () => {
        this.props.actions.deleteKeyword(this.props.match.params.id)
    }

    isDeleted = () => {
        if (this.props.keywords.deleted !== false) {
            return <Redirect to='/dashboard/keywords' />
        }
    }

    render() {
        return (
            <div>
                {this.isDeleted()}
                <div className="container-fluid">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to='/dashboard/keywords'>Keywords</Link>
                        </li>
                        <li className="breadcrumb-item active">Delete</li>
                    </ul>
                </div>
                <Modal
                    message={`Are you sure that you want to 
                    remove keyword ${this.props.match.params.id}?`}
                    cancelPath='/dashboard/keywords'
                    action={this.deleteKeyword} />
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

export default connect(mapStateToProps, mapDispatchToProps)(KeywordsDelete)