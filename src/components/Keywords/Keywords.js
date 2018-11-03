import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/KeywordsActions'
import KeywordsList from './KeywordsList'

class Keywords extends PureComponent {

    componentDidMount() {
        this.fetchKeywords()
    }

    fetchKeywords = () => {
        this.props.actions.fetchKeywords()
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="container-fluid">
                        <h2 className="h5 no-margin-bottom">Keywords</h2>
                    </div>
                </div>
                <KeywordsList />
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(Keywords)