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

const Option = Select.Option;

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

class RecommendationsCreate extends Component {

    constructor(props) {
        super(props)
        this.titleRef = React.createRef()
        this.typeRef = React.createRef()

        this.searchKeywords = debounce(this.searchKeywords, 800)
        this.searchGenres = debounce(this.searchGenres, 800)
    }

    componentDidMount() {
        if (this.props.recommendations.created) {
            this.props.actions.setCreateRecommendation(false)
        }
    }

    createRecommendation = () => {
        let title = this.titleRef.current.value

        this.props.actions.setCreateRecommendation('')

        let recommendation = {
            title: title
        }

        if (title === '') {
            this.props.actions.setError('Please, fill title field')
            return false
        }

        this.props.actions.create(recommendation)

        title = this.titleRef.current.value = ''
    }

    handleChange = value => {
        console.log(`selected ${value}`);
    }

    handleEditorChange = e => {
        console.log('Content was updated:', e.target.getContent());
    }

    searchKeywords = value => this.props.actions.searchKeywords(value)

    keywordsChange = value => this.props.actions.keywordsChange(value)

    searchGenres = value => this.props.actions.searchGenres(value)

    genresChange = value => this.props.actions.genresChange(value)

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
                        <li className="breadcrumb-item active">Create</li>
                    </ul>
                </div>
                <section className="no-padding-top">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">

                                <div className="block">
                                    <div className="title">
                                        <strong>Create recommendation</strong>
                                    </div>
                                    <div className="block-body">
                                        {this.props.recommendations.error !== '' ?
                                            <Alert message={this.props.recommendations.error} type='primary' />
                                            : null
                                        }
                                        {this.props.recommendations.created ?
                                            <Alert message="Keyword created successfully" type='success' />
                                            : null
                                        }
                                        <div className="form-group row">
                                            <label className="col-lg-3 form-control-label">Title</label>
                                            <div className="col-lg-9">
                                                <input ref={this.titleRef}
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
                                                    ref={this.bodyRef}
                                                    apiKey="524aoctgpx14f8bvkwp4nwtstg3qzosyouqmz0dkqto0mv11"
                                                    onChange={this.handleEditorChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="line"></div>

                                        <div className="form-group row">
                                            <label className="col-lg-3 form-control-label">Type</label>
                                            <div className="col-lg-9">
                                                <select ref={this.typeRef} className="form-control mb-3">
                                                    <option>Movie</option>
                                                    <option>Serie</option>
                                                    <option>Mixed</option>
                                                </select>
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
                                                    onClick={this.createRecommendation}
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
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        recommendations: state.recommendations,
        keywords: state.keywords,
        genres: state.genres
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        ...actions, ...keywordsActions, ...genresActions
    }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RecommendationsCreate)