import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/SourcesActions'
import SourcesList from './SourcesList'

class Sources extends Component {

    componentDidMount() {
        this.fetchSources()
    }

    fetchSources = () => {
        this.props.actions.fetchSources()
    }

    render() {
        const { loaded } = this.props.sources
        return (
            <div>
                <div className="page-header">
                    <div className="container-fluid">
                        <h2 className="h5 no-margin-bottom">Sources</h2>
                    </div>
                </div>
                {loaded ?
                    <SourcesList />
                    :
                    null
                }
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(Sources)