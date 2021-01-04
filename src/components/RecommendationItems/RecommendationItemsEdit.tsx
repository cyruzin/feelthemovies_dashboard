// @flow
import React, { useReducer, useEffect, useCallback } from 'react';

import format from 'date-fns/format';
import debounce from 'lodash/debounce';

import { types, initialState, reducer } from './duck';
import { httpFetch, httpFetchTMDb } from '../../util/request';

import AntSelect from 'antd/lib/select';
import AntSpin from 'antd/lib/spin';
import 'antd/lib/select/style/css';
import 'antd/lib/spin/style/css';

import {
  Alert,
  BreadCrumbs,
  Button,
  TextArea,
  FormGroup,
  Spinner,
  Section,
  SectionTitle
} from '../Common';

type Props = {
  match: Object;
};

function RecommendationItemsEdit(props: Props) {
  const { id } = props.match.params;
  const [recommendationItem, dispatch] = useReducer(reducer, initialState);

  const fillFields = useCallback((sources) => {
    const newSources = sources.map((value) => ({
      key: +value.id,
      label: value.name
    }));

    sourcesChangeHandler(newSources);

    dispatch({ type: types.FORM_FILLED });
  }, []);

  const fetchRecommendationItem = useCallback(async () => {
    try {
      dispatch({ type: types.FETCH });

      const data = {
        url: `/recommendation_item/${id}`,
        method: 'GET'
      };

      const response = await httpFetch(data);
      const sources = await fetchRecommendationItemSources(id);

      fillFields(sources);

      const {
        recommendation_id,
        tmdb_id,
        year,
        name,
        media_type,
        overview,
        poster,
        backdrop,
        trailer,
        commentary
      } = response;

      const payload = {
        searchValue: `${name} (${format(new Date(year), 'yyyy')})`,
        tmdb_id: tmdb_id,
        year: format(new Date(year), 'yyyy-MM-dd'),
        name: name,
        media_type: media_type,
        overview: overview,
        poster: poster,
        backdrop: backdrop,
        trailer: trailer,
        commentary: commentary,
        recommendation_id: +recommendation_id
      };

      dispatch({ type: types.ITEM, payload });
    } catch (error) {
      dispatch({ type: types.FAILURE, payload: error.message });
    }
  }, [fillFields, id]);

  async function fetchRecommendationItemSources(
    id: number | string
  ): Promise<void> {
    try {
      const response = await httpFetch({
        url: `/recommendation_item_sources/${id}`,
        method: 'GET'
      });
      return response.data;
    } catch (error) {
      dispatch({ type: types.FAILURE, payload: error });
    }
  }

  useEffect(() => {
    fetchRecommendationItem();
  }, [fetchRecommendationItem, id]);

  const fetchTmdbSearch = debounce((query: string) => {
    if (query === '') return;

    dispatch({ type: types.FETCH });

    httpFetchTMDb({
      url: `/search/multi?language=en-US&query=${encodeURIComponent(
        query.trim()
      )}&page=1&include_adult=false`
    })
      .then((response) => {
        const payload =
          response.results &&
          response.results.filter(
            (search) =>
              search.media_type !== 'person' && search.backdrop_path !== null
          );
        dispatch({ type: types.SEARCH, payload });
      })
      .catch((error) => dispatch({ type: types.FAILURE, payload: error }));
  }, 800);

  function tmdbSearchChangeHandler(selectedTitle: string): void {
    const { search } = recommendationItem;
    const item = search.find((item) => item.id === selectedTitle);
    const payload = {
      searchValue: item.name
        ? `${item.name} (${format(new Date(item.first_air_date), 'yyyy')})`
        : `${item.title} (${format(new Date(item.release_date), 'yyyy')})`,
      tmdb_id: +item.id,
      year: item.release_date || item.first_air_date,
      name: item.title || item.name,
      media_type: item.media_type,
      overview: item.overview,
      poster: item.poster_path,
      backdrop: item.backdrop_path
    };

    dispatch({ type: types.SEARCH_CHANGE, payload });

    const { media_type, id } = item;

    // Fetching the trailer of the current title.
    httpFetchTMDb({
      url: `/${media_type}/${id}?language=en-US&append_to_response=videos`
    })
      .then((response) =>
        dispatch({
          type: types.TRAILER,
          payload:
            response.videos.results.length > 0
              ? response.videos.results[0].key
              : ''
        })
      )
      .catch((error) => dispatch({ type: types.FAILURE, payload: error }));
  }

  const fetchSources = debounce((query: string) => {
    if (query === '') return;
    dispatch({ type: types.FETCH });

    httpFetch({
      url: `/search_source?query=${encodeURIComponent(query)}`,
      method: 'GET'
    })
      .then((response) =>
        dispatch({ type: types.SOURCES, payload: response.data })
      )
      .catch((error) =>
        dispatch({ type: types.FAILURE, payload: error.message })
      );
  }, 800);

  function sourcesChangeHandler(selectedSource: string) {
    dispatch({ type: types.SOURCES_CHANGE, payload: selectedSource });
  }

  function editRecommendationItem() {
    const {
      recommendation_id,
      tmdb_id,
      year,
      name,
      media_type,
      overview,
      poster,
      backdrop,
      trailer,
      commentary,
      sourcesValue
    } = recommendationItem;

    const newItem = {
      name: name,
      tmdb_id: tmdb_id,
      year: year,
      overview: overview,
      poster: poster,
      backdrop: backdrop,
      media_type: media_type,
      trailer: trailer,
      commentary: commentary,
      sources: sourcesValue.map((source) => source.key),
      recommendation_id: recommendation_id
    };

    httpFetch({
      url: `/recommendation_item/${id}`,
      method: 'PUT',
      data: newItem
    })
      .then(() => {
        dispatch({ type: types.MESSAGE, payload: 'Item edited successfully' });
      })
      .catch((error) =>
        dispatch({
          type: types.FAILURE,
          payload: error.message || error.errors[0].message
        })
      );
  }

  const {
    fetch,
    search,
    searchValue,
    commentary,
    sources,
    sourcesValue,
    error,
    message,
    formFilled,
    recommendation_id
  } = recommendationItem;

  return (
    <>
      <Alert
        message={error}
        variant="error"
        showAlert={error !== ''}
        onClose={() => dispatch({ type: types.FAILURE, payload: '' })}
      />
      <Alert
        message={message}
        variant="success"
        showAlert={message !== ''}
        onClose={() => dispatch({ type: types.MESSAGE, payload: '' })}
      />

      {formFilled && (
        <BreadCrumbs
          breadCrumbs={[
            {
              key: 1,
              path: '/dashboard/recommendations',
              name: 'Recommendations'
            },
            {
              key: 2,
              path: `/dashboard/items/${recommendation_id}`,
              name: 'Recommendation Item'
            }
          ]}
          activeName="Edit"
        />
      )}

      {!formFilled && <Spinner />}

      {formFilled && (
        <Section>
          <SectionTitle title="Edit Item" />
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
              onSearch={(query) => fetchTmdbSearch(query)}
              onChange={(selectedTitle) =>
                tmdbSearchChangeHandler(selectedTitle)
              }
            >
              {search &&
                search.map((item) => (
                  <AntSelect.Option key={item.id} value={item.id}>
                    {item.first_air_date
                      ? `${item.name} (${format(
                          new Date(item.first_air_date),
                          'yyyy'
                        )})`
                      : item.name}
                    {item.release_date
                      ? `${item.title} (${format(
                          new Date(item.release_date),
                          'yyyy'
                        )})`
                      : item.title}
                  </AntSelect.Option>
                ))}
            </AntSelect>
          </FormGroup>
          <FormGroup label="Commentary">
            <TextArea
              className="form-control"
              value={commentary}
              onChange={(event) =>
                dispatch({
                  type: types.COMMENTARY,
                  payload: event.target.value
                })
              }
            />
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
              onSearch={(query) => fetchSources(query)}
              onChange={(selectedSource) =>
                sourcesChangeHandler(selectedSource)
              }
            >
              {sources &&
                sources.map((source) => (
                  <AntSelect.Option key={source.id} value={source.id}>
                    {source.name}
                  </AntSelect.Option>
                ))}
            </AntSelect>
          </FormGroup>
          <FormGroup>
            <Button onClick={editRecommendationItem}>Edit</Button>
          </FormGroup>
        </Section>
      )}
    </>
  );
}

export default RecommendationItemsEdit;
