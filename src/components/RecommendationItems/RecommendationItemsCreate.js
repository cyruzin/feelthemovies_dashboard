// @flow
import React, { useReducer } from 'react'

import format from 'date-fns/format'
import debounce from 'lodash/debounce'

import { types, initialState, reducer } from './duck'
import { httpFetchTMDb } from '../../util/request'

import AntSelect from 'antd/lib/select'
import AntSpin from 'antd/lib/spin'
import 'antd/lib/select/style/css'
import 'antd/lib/spin/style/css'

import {
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

    const fetchTmdbSearch = debounce((query: string) => {
        if (query === '') return

        httpFetchTMDb({
            url: `/search/multi?language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`
        }).then(response => {
            dispatch({ type: types.FETCH })
            const payload = response.results && response.results
                .filter(search => search.media_type !== 'person' && search.backdrop_path !== null)
            dispatch({ type: types.SEARCH, payload })
        }).catch(error => dispatch({ type: types.FAILURE, payload: error }))
    }, 800)

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

        httpFetchTMDb({
            url: `/${media_type}/${id}?language=en-US&append_to_response=videos`
        }).then(response => dispatch({ type: types.TRAILER, payload: response.videos.results[0].key }))
            .catch(error => dispatch({ type: types.FAILURE, payload: error }))
    }

    const { fetch, search, searchValue, commentary } = recommendationItem

    return (
        <>
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
                        showSearch
                        size="large"
                        value={''}
                        style={{ width: '100%' }}
                        defaultActiveFirstOption={false}
                        notFoundContent={true && <AntSpin size="small" />}
                        showArrow={false}
                        filterOption={false}
                    //onSearch={query => fetchImages(query)}
                    //onChange={selectedImage => imageChangeHandler(selectedImage)}>
                    // {images && images.map(img =>
                    //     <AntSelect.Option key={img.id} value={img.id}>
                    //         {img.original_name && `${img.original_name} (${format(img.first_air_date, 'YYYY')})`}
                    //         {img.original_title && `${img.original_title} (${format(img.release_date, 'YYYY')})`}
                    //     </AntSelect.Option>
                    // )}
                    >
                        <AntSelect.Option key={1} label={1}>{"Test"}</AntSelect.Option>
                    </AntSelect>
                </FormGroup>
                <FormGroup>
                    <Button>Save</Button>
                </FormGroup>
            </Section>
        </>
    )
}

export default RecommendationItemsCreate