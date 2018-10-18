import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actions from '../../store/actions/RecommendationItemsActions'
import Select from 'antd/lib/select'
import Alert from '../Layout/Alert'
import { Editor } from '@tinymce/tinymce-react'
import debounce from 'lodash/debounce'
import { getYear } from '../../util/helpers'

const Option = Select.Option;

class RecommendationItemsCreate extends Component {

    constructor(props) {
        super(props)

        this.searchItemData = debounce(this.searchItemData, 800)
        this.searchSources = debounce(this.searchSources, 800)
        this.handleEditorChange = debounce(this.handleEditorChange, 800)

        this.editorRef = React.createRef()
    }

    componentDidMount() {
        this.props.actions.setRecommendationItemCreate(false)
    }

    reset = () => {
        this.props.actions.recommedationItemReset()
        this.editorRef.current.editor.setContent('')
    }

    searchItemData = value => {
        if (value !== '') {
            this.props.actions.fetchRecommendationItemData(value)
        }
    }

    ItemDataChange = value => {

        let item = this.props.recommendationItems.tmdb
            .filter(v => v.id === value)

        this.getItemTrailer(item[0].id, item[0].media_type)

        this.props.actions
            .setRecommendationItemData(item[0])

        if (item[0].hasOwnProperty('name')) {
            value = `${item[0].name} ${getYear(item[0].first_air_date)}`
        } else {
            value = `${item[0].title} ${getYear(item[0].release_date)}`
        }

        this.props.actions.recommendationItemDataChange(value)
    }

    getItemTrailer = (id, type) => {
        this.props.actions.fetchRecommendationItemTrailer(id, type)
    }

    handleEditorChange = e => {
        this.props.actions.setRecommendationItemCommentary(e.target.getContent())
    }

    createRecommendationItem = () => {

        const {
            name, year, overview, poster,
            backdrop, trailer, movie_id,
            sourcesValue, commentary
        } = this.props.recommendationItems

        const { id } = this.props.match.params

        let sources = sourcesValue.map(v => v.key)

        let recommendationItem = {
            name: name,
            movie_id: movie_id,
            year: year,
            overview: overview,
            poster: poster,
            backdrop: backdrop,
            trailer: trailer,
            commentary: commentary,
            sources: sources,
            recommendation_id: id,
        }

        if (name === '') {
            this.props.actions.setRecommendationItemError('Please, fill search field')
            return false
        }

        this.props.actions.createRecommendationItem(recommendationItem)

        this.reset()
    }

    searchSources = value => {
        this.props.actions.recommedationItemSource(value)
    }

    sourcesChange = value => {
        this.props.actions.recommendationItemSourceChange(value)
    }

    render() {
        const { id } = this.props.match.params

        return (
            <div>
                <div className="container-fluid">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to='/dashboard/recommendations'>Recommendation</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to={`/dashboard/items/${id}`}>Recommendation Item</Link>
                        </li>
                        <li className="breadcrumb-item active">Create</li>
                    </ul>
                    <section className="no-padding-top">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12">

                                    <div className="block">
                                        <div className="title">
                                            <strong>New Item</strong>
                                        </div>
                                        <div className="block-body">
                                            {this.props.recommendationItems.error !== '' ?
                                                <Alert message={this.props.recommendationItems.error} type='primary' />
                                                : null
                                            }
                                            {this.props.recommendationItems.created ?
                                                <Alert message="Item created successfully" type='success' />
                                                : null
                                            }

                                            <div className="form-group row">
                                                <label className="col-lg-3 form-control-label">
                                                    Search
                                                </label>
                                                <div className="col-lg-9">
                                                    <Select
                                                        placeholder="Movie/Serie"
                                                        showSearch
                                                        notFoundContent={false}
                                                        showArrow={false}
                                                        value={this.props.recommendationItems.tmdbValue}
                                                        size="large"
                                                        filterOption={false}
                                                        onSearch={this.searchItemData}
                                                        onChange={this.ItemDataChange}
                                                        style={{ width: '100%' }}
                                                    >
                                                        {this.props.recommendationItems.tmdb.map(v =>
                                                            <Option key={v.id} value={v.id}>
                                                                {v.hasOwnProperty('name') ?
                                                                    `${v.name} ${getYear(v.first_air_date)}`
                                                                    :
                                                                    `${v.title} ${getYear(v.release_date)}`
                                                                }
                                                            </Option>)
                                                        }
                                                    </Select>
                                                </div>
                                            </div>
                                            <div className="line"></div>

                                            <div className="form-group row">
                                                <label className="col-lg-3 form-control-label">Commentary</label>
                                                <div className="col-lg-9">
                                                    <Editor
                                                        init={{
                                                            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                                                        }}
                                                        apiKey="524aoctgpx14f8bvkwp4nwtstg3qzosyouqmz0dkqto0mv11"
                                                        ref={this.editorRef}
                                                        onChange={this.handleEditorChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="line"></div>

                                            <div className="form-group row">
                                                <label className="col-lg-3 form-control-label">
                                                    Sources
                                                </label>
                                                <div className="col-lg-9">
                                                    <Select
                                                        allowClear
                                                        mode="multiple"
                                                        labelInValue
                                                        value={this.props.recommendationItems.sourcesValue}
                                                        size="large"
                                                        notFoundContent={false}
                                                        filterOption={false}
                                                        onSearch={this.searchSources}
                                                        onChange={this.sourcesChange}
                                                        style={{ width: '100%' }}
                                                    >
                                                        {this.props.recommendationItems.sources.map(k =>
                                                            <Option key={k.id} value={k.id}>{k.name}</Option>)
                                                        }
                                                    </Select>
                                                </div>
                                            </div>
                                            <div className="line"></div>


                                            <div className="form-group row">
                                                <div className="col-sm-9 ml-auto">
                                                    <button
                                                        onClick={this.createRecommendationItem}
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
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        recommendationItems: state.recommendationItems
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(RecommendationItemsCreate)