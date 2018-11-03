import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import * as actions from '../../store/actions/SourcesActions'
import Modal from '../Layout/Modal'


class SourcesDelete extends PureComponent {


    deleteSource = () => {
        this.props.actions.deleteSource(this.props.match.params.id)
    }

    isDeleted = () => {
        if (this.props.sources.deleted !== false) {
            return <Redirect to='/dashboard/sources' />
        }
    }

    render() {
        return (
            <div>
                {this.isDeleted()}
                <div className="container-fluid">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to='/dashboard/sources'>Genres</Link>
                        </li>
                        <li className="breadcrumb-item active">Delete</li>
                    </ul>
                </div>
                <Modal
                    message={`Are you sure that you want to 
                    remove source ${this.props.match.params.id}?`}
                    cancelPath='/dashboard/sources'
                    action={this.deleteSource} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SourcesDelete)