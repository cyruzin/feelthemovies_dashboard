import React, { useReducer } from 'react'
import debounce from 'lodash/debounce'
import { httpFetch, httpFetchTMDb } from '../../util/request'
import AntSelect from 'antd/lib/select'
import AntSpin from 'antd/lib/spin'
import 'antd/lib/select/style/css'
import 'antd/lib/spin/style/css'
import {
    Section, SectionTitle, BreadCrumbs, FormGroup,
    Input, TextArea, Select, Option, Button
} from '../Common'

function RecommendationsCreate () {
    const types = {
        TITLE: 'RECOMMENDATIONS_CREATE/TITLE',
        BODY: 'RECOMMENDATIONS_CREATE/BODY',
        TYPE: 'RECOMMENDATIONS_CREATE/TYPE',
        IMAGE: 'RECOMMENDATIONS_CREATE/IMAGE',
        GENRES: 'RECOMMENDATIONS_CREATE/GENRES',
        KEYWORDS: 'RECOMMENDATIONS_CREATE/KEYWORDS',
        FETCH: 'RECOMMENDATIONS_CREATE/FETCH',
        SUCCESS: 'RECOMMENDATIONS_CREATE/SUCCESS',
        FAILURE: 'RECOMMENDATIONS_CREATE/ERROR'
    }

    const initialState = {
        title: '',
        body: '',
        image: '',
        genres: [],
        keywords: [],
        type: 0
    }

    function reducer (state, action) {
        switch (action.type) {
            case types.TITLE:
                return {
                    ...state,
                    title: action.payload
                }
            case types.BODY:
                return {
                    ...state,
                    body: action.payload
                }
            case types.TYPE:
                return {
                    ...state,
                    type: +action.payload
                }
            case types.IMAGE:
                return {
                    ...state,
                    image: action.payload
                }
            case types.GENRES:
                return {
                    ...state,
                    genres: action.payload
                }
            case types.KEYWORDS:
                return {
                    ...state,
                    keywords: action.payload
                }
            default: return state
        }
    }

    const [recommendations, dispatch] = useReducer(reducer, initialState)

    console.log(recommendations)

    const getImage = debounce(query => {
        if (query === '') return

        httpFetchTMDb({
            url: `/search/multi?language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`
        }).then(response => {
            const payload = response.results
                .filter(v => v.media_type !== 'person' && v.backdrop_path !== null)
            dispatch({ type: types.IMAGE, payload })
        })
    }, 800)

    return (
        <>
            <BreadCrumbs
                activeName="Create"
                breadCrumbs={[{
                    key: 1,
                    path: '/dashboard/recommendations',
                    name: 'Recommendations'
                }]} />
            <Section>
                <SectionTitle title="Create Recommendation" />

                <FormGroup label="Title">
                    <Input
                        className="form-control"
                        onChange={event => dispatch({ type: types.TITLE, payload: event.target.value })} />
                </FormGroup>

                <FormGroup label="Body">
                    <TextArea
                        className="form-control"
                        onChange={event => dispatch({ type: types.BODY, payload: event.target.value })} />
                </FormGroup>

                <FormGroup label="Type">
                    <Select
                        className="form-control mb-3"
                        onChange={event => dispatch({ type: types.TYPE, payload: event.target.value })}>
                        <Option value="0" defaultValue>Movie</Option>
                        <Option value="1">TV Show</Option>
                        <Option value="2">Mixed</Option>
                    </Select>
                </FormGroup>

                <FormGroup label="Image">
                    <AntSelect
                        showSearch
                        size='large'
                        value={''}
                        style={{ width: '100%' }}
                        defaultActiveFirstOption={false}
                        notFoundContent={
                            true ? <AntSpin size="small" /> : null
                        }
                        showArrow={false}
                        filterOption={false}
                        onSearch={query => getImage(query)}
                    //onChange={this.handleRecommendationImage}
                    >
                        <AntSelect.Option key={1} value="test">
                            Test
                        </AntSelect.Option>
                    </AntSelect>
                </FormGroup>

                <FormGroup label="Genres">
                    <AntSelect
                        mode="multiple"
                        labelInValue
                        size='large'
                        //value={''}
                        style={{ width: '100%' }}
                        notFoundContent={
                            true ? <AntSpin size="small" /> : null
                        }
                        showArrow={false}
                        filterOption={false}
                    // onSearch={this.fetchRecommendationImages}
                    //onChange={this.handleRecommendationImage}
                    >
                        <AntSelect.Option key={1} value="test">
                            Test
                        </AntSelect.Option>
                    </AntSelect>
                </FormGroup>

                <FormGroup label="Keywords">
                    <AntSelect
                        mode="multiple"
                        labelInValue
                        size='large'
                        // value={''}
                        style={{ width: '100%' }}
                        notFoundContent={
                            true ? <AntSpin size="small" /> : null
                        }
                        showArrow={false}
                        filterOption={false}
                    // onSearch={this.fetchRecommendationImages}
                    //onChange={this.handleRecommendationImage}
                    >
                        <AntSelect.Option key={1} value="test">
                            Test
                        </AntSelect.Option>
                    </AntSelect>
                </FormGroup>

                <FormGroup>
                    <Button>Create</Button>
                </FormGroup>

            </Section>
        </>
    )
}

export default RecommendationsCreate