// @flow
import React, { useReducer } from 'react'

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
    TextArea,
    FormGroup,
    Section,
    SectionTitle
} from '../Common'

type Props = {
    match: Object
}

function RecommendationItemsCreate (props: Props) {
    const { id } = props.match.params
    const [recommendationItem, dispatch] = useReducer(reducer, initialState)

    /**
    * Fetch for a Movie or TV Show.
    * 
    * @param {string} query - Search query
    */
    const fetchTmdbSearch = debounce((query: string) => {
        if (query === '') return

        dispatch({ type: types.FETCH })

        httpFetchTMDb({
            url: `/search/multi?language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`
        }).then(response => {
            const payload = response.results && response.results
                .filter(search => search.media_type !== 'person' && search.backdrop_path !== null)
            dispatch({ type: types.SEARCH, payload })
        }).catch(error => dispatch({ type: types.FAILURE, payload: error }))
    }, 800)

    /** 
     * Set the selected title in the input.
     * 
     * @param {string} selectedTitle - Selected title 
     */
    function tmdbSearchChangeHandler (selectedTitle: string) {
        const { search } = recommendationItem
        const item = search.find(item => item.id === selectedTitle)
        const payload = {
            searchValue: item.original_name ?
                `${item.original_name} (${format(item.first_air_date, 'YYYY')})`
                : `${item.original_title} (${format(item.release_date, 'YYYY')})`,
            item
        }

        dispatch({ type: types.SEARCH_CHANGE, payload })

        const { media_type, id } = item

        // Fetching the trailer of the current title.
        httpFetchTMDb({
            url: `/${media_type}/${id}?language=en-US&append_to_response=videos`
        }).then(response => dispatch({ type: types.TRAILER, payload: response.videos.results[0].key }))
            .catch(error => dispatch({ type: types.FAILURE, payload: error }))
    }

    /**
     * Fetch the sources.
     * 
     * @param {string} query - Search query
     */
    const fetchSources = debounce((query: string) => {
        if (query === '') return
        dispatch({ type: types.FETCH })

        httpFetch({
            url: `/search_source?query=${encodeURIComponent(query)}`,
            method: 'GET'
        }).then(response => dispatch({ type: types.SOURCES, payload: response.data }))
            .catch(error => dispatch({ type: types.FAILURE, payload: error.message }))
    }, 800)

    /**
     * Set the selected source in the input.
     * 
     * @param {string} selectedSource - Selected source 
     */
    function sourcesChangeHandler (selectedSource: string) {
        dispatch({ type: types.SOURCES_CHANGE, payload: selectedSource })
    }

    /**
     * Create the recommendation item.
     */
    function createRecommendationItem () {
        const {
            item, trailer, commentary, sourcesValue
        } = recommendationItem

        const newItem = {
            name: item.original_name || item.original_title,
            tmdb_id: +item.id,
            year: item.first_air_date || item.release_date,
            overview: item.overview,
            poster: item.poster_path,
            backdrop: item.backdrop_path,
            media_type: item.media_type,
            trailer: trailer,
            commentary: commentary,
            sources: sourcesValue.map(source => source.key),
            recommendation_id: +id,
        }

        httpFetch({
            url: '/recommendation_item',
            method: 'POST',
            data: newItem
        }).then(() => {
            dispatch({ type: types.RESET })
            dispatch({ type: types.MESSAGE, payload: "Item created successfully" })
        }).catch(error => dispatch({ type: types.FAILURE, payload: error.message || error.errors[0].message }))
    }

    const {
        fetch, search, searchValue, commentary,
        sources, sourcesValue, error, message
    } = recommendationItem

    return (
        <>
            <Alert message={error} variant="error" showAlert={error !== ''} />
            <Alert message={message} variant="success" showAlert={message !== ''} />
            <BreadCrumbs
                breadCrumbs={[
                    {
                        key: 1,
                        path: '/dashboard/recommendations',
                        name: 'Recommendations'
                    },
                    {
                        key: 2,
                        path: `/dashboard/items/${id}`,
                        name: 'Recommendation Item'
                    }
                ]}
                activeName="Create"
            />
            <Section>
                <SectionTitle title="New Item" />
                <FormGroup label="Search">
                    <AntSelect
                        showSearch
                        placeholder="Search for a Movie or TV Show"
                        size="large"
                        value={searchValue}
                        style={{ width: '100%' }}
                        defaultActiveFirstOption={false}
                        notFoundContent={fetch && <AntSpin size="small" />}
                        showArrow={false}
                        filterOption={false}
                        onSearch={query => fetchTmdbSearch(query)}
                        onChange={selectedTitle => tmdbSearchChangeHandler(selectedTitle)}>
                        {search && search.map(item =>
                            <AntSelect.Option key={item.id} value={item.id}>
                                {item.original_name && `${item.original_name} (${format(item.first_air_date, 'YYYY')})`}
                                {item.original_title && `${item.original_title} (${format(item.release_date, 'YYYY')})`}
                            </AntSelect.Option>
                        )}
                    </AntSelect>
                </FormGroup>
                <FormGroup label="Commentary">
                    <TextArea
                        className="form-control"
                        value={commentary}
                        onChange={event => dispatch({ type: types.COMMENTARY, payload: event.target.value })} />
                </FormGroup>
                <FormGroup label="Sources">
                    <AntSelect
                        mode="multiple"
                        labelInValue
                        size="large"
                        value={sourcesValue}
                        style={{ width: '100%' }}
                        defaultActiveFirstOption={false}
                        notFoundContent={fetch && <AntSpin size="small" />}
                        showArrow={false}
                        filterOption={false}
                        onSearch={query => fetchSources(query)}
                        onChange={selectedSource => sourcesChangeHandler(selectedSource)}>
                        {sources && sources.map(source =>
                            <AntSelect.Option key={source.id} value={source.id}>
                                {source.name}
                            </AntSelect.Option>
                        )}
                    </AntSelect>
                </FormGroup>
                <FormGroup>
                    <Button onClick={createRecommendationItem}>Save</Button>
                </FormGroup>
            </Section>
        </>
    )
}

export default RecommendationItemsCreate