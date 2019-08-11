// @flow
import React, { useReducer, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'

import format from 'date-fns/format'
import debounce from 'lodash/debounce'

import { types, initialState, reducer } from './duck'
import { httpFetch, httpFetchTMDb } from '../../util/request'

import AntSelect from 'antd/lib/select'
import AntSpin from 'antd/lib/spin'
import 'antd/lib/select/style/css'
import 'antd/lib/spin/style/css'

import {
    Alert,
    BreadCrumbs,
    Button,
    Input,
    FormGroup,
    Section,
    SectionTitle,
    Select,
    Spinner,
    TextArea,
    Option
} from '../Common'

type Props = {
    history: Object,
    match: Object,
    location: Object
}

function RecommendationsEdit (props: Props) {
    const [recommendations, dispatch] = useReducer(reducer, initialState)
    const userData = useSelector(state => state.authentication.user)
    const { id } = props.match.params

    /**
     * Fill all fields with the info of the given recommendation.
     */
    const fillFields = useCallback((response) => {
        const { genres, keywords } = response

        const newGenres = genres.map(value => ({
            key: value.id,
            label: value.name
        }))

        const newKeywords = keywords.map(value => ({
            key: value.id,
            label: value.name
        }))

        genresChangeHandler(newGenres)
        keywordsChangeHandler(newKeywords)

        dispatch({ type: types.FORM_FILLED })
    }, [])

    /**
    * Fetch recommendation by a given ID. 
    */
    const fetchRecommendation = useCallback(() => {
        dispatch({ type: types.FETCH })
        httpFetch({
            url: `/recommendation/${id}`,
            method: 'GET'
        }).then(response => {
            fillFields(response)
            dispatch({ type: types.RECOMMENDATION, payload: response })
        }).catch(error => dispatch({ type: types.FAILURE, payload: error.message }))
    }, [fillFields, id])

    /**
     * On mount.
     */
    useEffect(() => {
        fetchRecommendation()

        return () => dispatch({ type: types.RESET }) // Unmounting.
    }, [fetchRecommendation])

    /**
     * Fetch the Poster/Backdrop from TMDb.
     * 
     * @param {string} query - Search query
     */
    const fetchImages = debounce((query: string) => {
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

    /** 
     * Set the selected image in the input.
     * 
     * @param {string} selectedImage - Selected image 
     */
    function imageChangeHandler (selectedImage: string) {
        const { images } = recommendations
        const image = images.find(img => img.id === selectedImage)
        const payload = {
            imageValue: image.original_name ?
                `${image.original_name} (${format(image.first_air_date, 'YYYY')})`
                : `${image.original_title} (${format(image.release_date, 'YYYY')})`,
            poster: image.poster_path,
            backdrop: image.backdrop_path
        }
        dispatch({ type: types.IMAGE_CHANGE, payload })
    }

    /**
     * Fetch the genres.
     * 
     * @param {string} query - Search query
     */
    const fetchGenres = debounce((query: string) => {
        if (query === '') return
        dispatch({ type: types.FETCH })

        httpFetch({
            url: `/search_genre?query=${encodeURIComponent(query)}`,
            method: 'GET'
        }).then(response => dispatch({ type: types.GENRES, payload: response.data }))
            .catch(error => dispatch({ type: types.FAILURE, payload: error.message }))
    }, 800)

    /**
     * Set the selected genre in the input.
     * 
     * @param {string} selectedGenre - Selected genre 
     */
    function genresChangeHandler (selectedGenre: string) {
        dispatch({ type: types.GENRES_CHANGE, payload: selectedGenre })
    }

    /**
     * Fetch the keywords.
     * 
     * @param {string} query - Search query
     */
    const fetchKeywords = debounce((query: string) => {
        if (query === '') return
        dispatch({ type: types.FETCH })

        httpFetch({
            url: `/search_keyword?query=${encodeURIComponent(query)}`,
            method: 'GET'
        }).then(response => dispatch({ type: types.KEYWORDS, payload: response.data }))
            .catch(error => dispatch({ type: types.FAILURE, payload: error.message }))
    }, 800)

    /**
     * Set the selected keyword in the input.
     * 
     * @param {string} selectedKeyword - Selected keyword 
     */
    function keywordsChangeHandler (selectedKeyword: string) {
        dispatch({ type: types.KEYWORDS_CHANGE, payload: selectedKeyword })
    }

    /**
     * Edit the recommendation.
     */
    function editRecommendation () {
        const {
            title, body, type, poster, backdrop,
            genresValue, keywordsValue
        } = recommendations

        const recommendation = {
            title: title,
            body: body,
            type: +type,
            status: +status,
            genres: genresValue.map(genre => +genre.key),
            keywords: keywordsValue.map(keywords => +keywords.key),
            poster: poster,
            backdrop: backdrop,
            user_id: +userData.id
        }

        httpFetch({
            url: `/recommendation/${id}`,
            method: 'PUT',
            data: recommendation
        }).then(() => {
            dispatch({ type: types.FAILURE, payload: '' })
            dispatch({ type: types.MESSAGE, payload: "Recommendation edited successfully" })
        }).catch(error => dispatch({ type: types.FAILURE, payload: error.message || error.errors[0].message }))
    }

    const {
        fetch, title, body, type, status, images, imageValue,
        genres, genresValue, keywords, keywordsValue, error,
        message, formFilled
    } = recommendations

    return (
        <>
            <Alert message={error} variant="error" showAlert={error !== ''} />
            <Alert message={message} variant="success" showAlert={message !== ''} />
            <BreadCrumbs
                activeName="Edit"
                breadCrumbs={[{
                    key: 1,
                    path: '/dashboard/recommendations',
                    name: 'Recommendations'
                }]} />

            {!formFilled && <Spinner />}

            {formFilled &&
                <Section>
                    <SectionTitle title="Edit Recommendation" />
                    <FormGroup label="Title">
                        <Input
                            className="form-control"
                            value={title}
                            onChange={event => dispatch({ type: types.TITLE, payload: event.target.value })} />
                    </FormGroup>
                    <FormGroup label="Body">
                        <TextArea
                            className="form-control"
                            value={body}
                            onChange={event => dispatch({ type: types.BODY, payload: event.target.value })} />
                    </FormGroup>
                    <FormGroup label="Type">
                        <Select
                            className="form-control mb-3"
                            value={type}
                            onChange={event => dispatch({ type: types.TYPE, payload: event.target.value })}>
                            <Option value="0" defaultValue>Movie</Option>
                            <Option value="1">TV Show</Option>
                            <Option value="2">Mixed</Option>
                        </Select>
                    </FormGroup>
                    <FormGroup label="Status">
                        <Select
                            className="form-control mb-3"
                            value={status}
                            onChange={event => dispatch({ type: types.STATUS, payload: event.target.value })}>
                            <Option value="0" defaultValue>Inactive</Option>
                            <Option value="1">Active</Option>
                        </Select>
                    </FormGroup>
                    <FormGroup label="Poster/Backdrop">
                        <AntSelect
                            showSearch
                            size="large"
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
                                    {img.original_name && `${img.original_name} (${format(img.first_air_date, 'YYYY')})`}
                                    {img.original_title && `${img.original_title} (${format(img.release_date, 'YYYY')})`}
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
                        <Button onClick={editRecommendation}>Edit</Button>
                    </FormGroup>
                </Section>}
        </>
    )
}

export default RecommendationsEdit