import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import debounce from 'lodash/debounce'
import Alert from '../Layout/Alert'
import Select from 'antd/lib/select'
import Spin from 'antd/lib/spin'
import 'antd/lib/select/style/css'
import 'antd/lib/spin/style/css'
import { Editor } from '@tinymce/tinymce-react'
import * as actions from '../../store/actions/RecommendationsActions'
import * as keywordsActions from '../../store/actions/KeywordsActions'
import * as genresActions from '../../store/actions/GenresActions'
import { getYear } from '../../util/helpers'

const Option = Select.Option;

let type = '0'
let status = '0'
let body = ''

class RecommendationsEdit extends Component {

    constructor(props) {
        super(props)
        this.titleRef = React.createRef()
        this.editorRef = React.createRef()
        this.typeRef = React.createRef()

        this.searchKeywords = debounce(this.searchKeywords, 800)
        this.searchGenres = debounce(this.searchGenres, 800)
        this.fetchRecommendationImages = debounce(this.fetchRecommendationImages, 800)
        this.setFields = debounce(this.setFields, 800)
    }

    componentDidMount() {
        this.props.actions.setEditRecommendation(false)
        this.fetchRecommendation()
        this.setFields()
    }

    componentWillUnmount() {
        this.reset()
    }

    reset = () => {
        this.props.actions.setRecommendationReset()
        this.props.actions.setGenresReset()
        this.props.actions.setKeywordsReset()
        this.titleRef.current.value = ''
        this.editorRef.current.editor.setContent('')
        this.typeRef.current.value = 0
    }

    setFields = () => {
        if (this.props.recommendations.editLoaded) {
            this.props.actions.setRecommendationEditLoaded(false)
        }

        body = this.props.recommendations.recommendationData.body
        type = this.props.recommendations.recommendationData.type

        this.props.actions.setRecommendationImagesChange(this.props.recommendations.recommendationData.backdrop)

        this.props.actions.setRecommendationImages(
            this.props.recommendations.recommendationData.poster,
            this.props.recommendations.recommendationData.backdrop
        )

        let genres = this.props.recommendations.recommendationData.genres.map(v => {
            let genre = {}
            genre.key = v.id
            genre.label = v.name
            return genre
        })

        let keywords = this.props.recommendations.recommendationData.keywords.map(v => {
            let keyword = {}
            keyword.key = v.id
            keyword.label = v.name
            return keyword
        })

        this.genresChange(genres)
        this.keywordsChange(keywords)

        this.props.actions.setRecommendationEditLoaded(true)

    }

    fetchRecommendation = () => {
        this.props.actions.fetchRecommendation(this.props.match.params.id)
    }

    editRecommendation = () => {

        let title = this.titleRef.current.value
        let genres = this.props.genres.genresValue.map(v => v.key)
        let keywords = this.props.keywords.keywordsValue.map(v => v.key)

        this.props.actions.setEditRecommendation(false)

        let recommendation = {
            title: title,
            body: body,
            type: type,
            status: status,
            genres: genres,
            poster: this.props.recommendations.poster,
            backdrop: this.props.recommendations.backdrop,
            keywords: keywords,
            user_id: this.props.auth.id
        }

        if (title === '' || type === '' || body === '') {
            this.props.actions.setRecommendationError('Please, fill all fields')
            return false
        }

        this.props.actions.editRecommendation(this.props.match.params.id, recommendation)

        this.props.actions.setEditRecommendation(true)
    }

    handleType = e => {
        type = e.target.value
    }

    handleStatus = e => {
        console.log(e.target.value)
        status = e.target.value
    }

    handleEditorChange = e => {
        body = e.target.getContent()
    }
    searchKeywords = value => this.props.actions.searchKeywords(value)

    keywordsChange = value => this.props.actions.keywordsChange(value)

    searchGenres = value => this.props.actions.searchGenres(value)

    genresChange = value => {
        this.props.actions.genresChange(value)
    }

    fetchRecommendationImages = value => {
        this.props.actions.fetchRecommendationImages(value)
    }

    handleRecommendationImage = value => {

        let image = this.props.recommendations.images
            .filter(v => v.id === value)

        this.props.actions
            .setRecommendationImages(image[0].poster_path, image[0].backdrop_path)

        if (image[0].hasOwnProperty('name')) {
            value = `${image[0].name} ${getYear(image[0].first_air_date)}`
        } else {
            value = `${image[0].title} ${getYear(image[0].release_date)}`
        }

        this.props.actions.imagesChange(value)
    }

    render() {
        return (
            <div>
                <div className="container-fluid">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to='/dashboard/recommendations'>
                                Recommendations
                            </Link>
                        </li>
                        <li className="breadcrumb-item active">Edit</li>
                    </ul>
                </div>
                {this.props.recommendations.editLoaded ?
                    <section className="no-padding-top">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12">

                                    <div className="block">
                                        <div className="title">
                                            <strong>Edit recommendation</strong>
                                        </div>
                                        <div className="block-body">
                                            {this.props.recommendations.error !== '' ?
                                                <Alert message={this.props.recommendations.error} type='primary' />
                                                : null
                                            }
                                            {this.props.recommendations.edited ?
                                                <Alert message="Recommendations edited successfully" type='success' />
                                                : null
                                            }
                                            <div className="form-group row">
                                                <label className="col-lg-3 form-control-label">Title</label>
                                                <div className="col-lg-9">
                                                    <input ref={this.titleRef}
                                                        defaultValue={this.props.recommendations.recommendationData.title}
                                                        type="text"
                                                        className="form-control" />
                                                </div>
                                            </div>
                                            <div className="line"></div>

                                            <div className="form-group row">
                                                <label className="col-lg-3 form-control-label">Body</label>
                                                <div className="col-lg-9">
                                                    <Editor
                                                        init={{
                                                            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                                                        }}
                                                        initialValue={this.props.recommendations.recommendationData.body}
                                                        apiKey="524aoctgpx14f8bvkwp4nwtstg3qzosyouqmz0dkqto0mv11"
                                                        ref={this.editorRef}
                                                        onFocusOut={this.handleEditorChange}
                                                        onChange={this.handleEditorChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="line"></div>

                                            <div className="form-group row">
                                                <label className="col-lg-3 form-control-label">Type</label>
                                                <div className="col-lg-9">
                                                    <select onChange={this.handleType}
                                                        defaultValue={this.props.recommendations.recommendationData.type}
                                                        ref={this.typeRef}
                                                        className="form-control mb-3">
                                                        <option value="0">Movie</option>
                                                        <option value="1">Serie</option>
                                                        <option value="2">Mixed</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="line"></div>

                                            <div className="form-group row">
                                                <label className="col-lg-3 form-control-label">Status</label>
                                                <div className="col-lg-9">
                                                    <select
                                                        onChange={this.handleStatus}
                                                        defaultValue={this.props.recommendations.recommendationData.status}
                                                        className="form-control mb-3">
                                                        <option value="0">Inactive</option>
                                                        <option value="1">Active</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="line"></div>

                                            <div className="form-group row">
                                                <label className="col-lg-3 form-control-label">Image</label>
                                                <div className="col-lg-9">
                                                    <Select
                                                        showSearch
                                                        size='large'
                                                        value={this.props.recommendations.imagesValue}
                                                        style={{ width: '100%' }}
                                                        defaultActiveFirstOption={false}
                                                        showArrow={false}
                                                        filterOption={false}
                                                        onSearch={this.fetchRecommendationImages}
                                                        onChange={this.handleRecommendationImage}
                                                        notFoundContent={null}
                                                    >
                                                        {this.props.recommendations.images.map(v =>

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
                                                <label className="col-lg-3 form-control-label">Genres</label>
                                                <div className="col-lg-9">
                                                    <Select
                                                        allowClear
                                                        mode="multiple"
                                                        labelInValue
                                                        value={this.props.genres.genresValue}
                                                        size="large"
                                                        notFoundContent={this.props.genres.loadingGenres ? <Spin size="small" /> : null}
                                                        filterOption={false}
                                                        onSearch={this.searchGenres}
                                                        onChange={this.genresChange}
                                                        style={{ width: '100%' }}
                                                    >
                                                        {this.props.genres.genres.map(k =>
                                                            <Option key={k.id} value={k.id}>{k.name}</Option>)
                                                        }
                                                    </Select>
                                                </div>
                                            </div>
                                            <div className="line"></div>

                                            <div className="form-group row">
                                                <label className="col-lg-3 form-control-label">Keywords</label>
                                                <div className="col-lg-9">
                                                    <Select
                                                        allowClear
                                                        mode="multiple"
                                                        labelInValue
                                                        value={this.props.keywords.keywordsValue}
                                                        size="large"
                                                        notFoundContent={this.props.keywords.loadingKeywords ? <Spin size="small" /> : null}
                                                        filterOption={false}
                                                        onSearch={this.searchKeywords}
                                                        onChange={this.keywordsChange}
                                                        style={{ width: '100%' }}
                                                    >
                                                        {this.props.keywords.keywords.map(k =>
                                                            <Option key={k.id} value={k.id}>{k.name}</Option>)
                                                        }
                                                    </Select>
                                                </div>
                                            </div>
                                            <div className="line"></div>


                                            <div className="form-group row">
                                                <div className="col-sm-9 ml-auto">
                                                    <button
                                                        onClick={this.editRecommendation}
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
                    : null
                }
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        recommendations: state.recommendations,
        keywords: state.keywords,
        genres: state.genres,
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        ...actions, ...keywordsActions, ...genresActions
    }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RecommendationsEdit)