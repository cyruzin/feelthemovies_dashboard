import React, { useReducer } from 'react'
import { types, initialState, reducer } from './duck'
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
    const [recommendations, dispatch] = useReducer(reducer, initialState)

    const fetchImages = debounce(query => {
        if (query === '') return

        dispatch({ type: types.FETCH })
        httpFetchTMDb({
            url: `/search/multi?language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`
        }).then(response => {
            const payload = response.results
                .filter(img => img.media_type !== 'person' && img.backdrop_path !== null)
            dispatch({ type: types.IMAGES, payload })
        }).catch(error => dispatch({ type: types.FAILURE, payload: error }))
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

    const fetchGenres = debounce(query => {
        dispatch({ type: types.FETCH })

        httpFetch({
            url: `/search_genre?query=${encodeURIComponent(query)}`,
            method: 'GET'
        }).then(response => dispatch({ type: types.GENRES, payload: response.data }))
            .catch(error => dispatch({ type: types.FAILURE, payload: error }))
    }, 800)

    function genresChangeHandler (selectedGenre) {
        dispatch({ type: types.GENRES_CHANGE, payload: selectedGenre })
    }

    const fetchKeywords = debounce(query => {
        dispatch({ type: types.FETCH })

        httpFetch({
            url: `/search_keyword?query=${encodeURIComponent(query)}`,
            method: 'GET'
        }).then(response => dispatch({ type: types.KEYWORDS, payload: response.data }))
            .catch(error => dispatch({ type: types.FAILURE, payload: error }))
    }, 800)

    function keywordsChangeHandler (selectedKeyword) {
        dispatch({ type: types.KEYWORDS_CHANGE, payload: selectedKeyword })
    }



    const {
        fetch, images, imageValue, genres, genresValue,
        keywords, keywordsValue
    } = recommendations

    console.log(recommendations)

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
                        onSearch={query => fetchImages(query)}
                        onChange={selectedImage => imageChangeHandler(selectedImage)}>
                        {images && images.map(img =>
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
                        value={genresValue}
                        style={{ width: '100%' }}
                        notFoundContent={fetch && <AntSpin size="small" />}
                        showArrow={false}
                        filterOption={false}
                        onSearch={query => fetchGenres(query)}
                        onChange={selectedGenre => genresChangeHandler(selectedGenre)}>
                        {genres && genres.map(genre =>
                            <AntSelect.Option key={genre.id} value={genre.id}>
                                {genre.name}
                            </AntSelect.Option>
                        )}
                    </AntSelect>
                </FormGroup>

                <FormGroup label="Keywords">
                    <AntSelect
                        mode="multiple"
                        labelInValue
                        size='large'
                        value={keywordsValue}
                        style={{ width: '100%' }}
                        notFoundContent={fetch && <AntSpin size="small" />}
                        showArrow={false}
                        filterOption={false}
                        onSearch={query => fetchKeywords(query)}
                        onChange={selectedKeyword => keywordsChangeHandler(selectedKeyword)}>
                        {keywords && keywords.map(keyword =>
                            <AntSelect.Option key={keyword.id} value={keyword.id}>
                                {keyword.name}
                            </AntSelect.Option>
                        )}
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