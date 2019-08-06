import React, { useReducer } from 'react'
import { types, initialState, reducer } from './duck'
import debounce from 'lodash/debounce'
import { httpFetchTMDb } from '../../util/request'
import AntSelect from 'antd/lib/select'
import AntSpin from 'antd/lib/spin'
import 'antd/lib/select/style/css'
import 'antd/lib/spin/style/css'
import {
    Section, SectionTitle, BreadCrumbs, FormGroup,
    Input, TextArea, Select, Option, Button
} from '../Common'

function RecommendationsCreate () {
    const [recommendations, dispatch] = useReducer(reducer, initialState)

    const getImages = debounce(query => {
        if (query === '') return

        dispatch({ type: types.FETCH })
        httpFetchTMDb({
            url: `/search/multi?language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`
        }).then(response => {
            const payload = response.results
                .filter(img => img.media_type !== 'person' && img.backdrop_path !== null)
            dispatch({ type: types.IMAGES, payload })
        })
    }, 800)

    function imageChangeHandler (selectedImage) {
        const { images } = recommendations
        const image = images.find(img => img.id === selectedImage)
        const payload = {
            imageValue: image.original_name ?
                `${image.original_name} (${image.first_air_date})`
                : `${image.original_title} (${image.release_date})`,
            poster: image.poster_path,
            backdrop: image.backdrop_path
        }
        dispatch({ type: types.IMAGE_CHANGE, payload })
    }

    const { fetch, images, imageValue } = recommendations

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
                        value={imageValue}
                        style={{ width: '100%' }}
                        defaultActiveFirstOption={false}
                        notFoundContent={fetch && <AntSpin size="small" />}
                        showArrow={false}
                        filterOption={false}
                        onSearch={query => getImages(query)}
                        onChange={selectedImage => imageChangeHandler(selectedImage)}>
                        {images.map(img =>
                            <AntSelect.Option key={img.id} value={img.id}>
                                {img.original_name && `${img.original_name} (${img.first_air_date})`}
                                {img.original_title && `${img.original_title} (${img.release_date})`}
                            </AntSelect.Option>
                        )}
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