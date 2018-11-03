import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/SourcesActions'
import SourcesList from './SourcesList'

class Sources extends PureComponent {

    componentDidMount() {
        this.fetchSources()
    }

    fetchSources = () => {
        this.props.actions.fetchSources()
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="container-fluid">
                        <h2 className="h5 no-margin-bottom">Sources</h2>
                    </div>
                </div>
                <SourcesList />
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