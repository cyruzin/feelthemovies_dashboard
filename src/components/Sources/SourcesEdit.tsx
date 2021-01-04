// @flow
import React, { useReducer, useEffect, useCallback } from 'react';

import { types, initialState, reducer } from './duck';
import { httpFetch } from '../../util/request';

import {
  Alert,
  BreadCrumbs,
  Button,
  Input,
  FormGroup,
  Section,
  SectionTitle,
  Spinner
} from '../Common';

type Props = {
  history: Object;
  match: Object;
  location: Object;
};

function SourcesEdit(props: Props) {
  const [sources, dispatch] = useReducer(reducer, initialState);
  const { id } = props.match.params;

  const fetchSource = useCallback(() => {
    dispatch({ type: types.FETCH });
    httpFetch({
      url: `/source/${id}`,
      method: 'GET'
    })
      .then((response) =>
        dispatch({ type: types.NAME, payload: response.name })
      )
      .catch((error) =>
        dispatch({ type: types.FAILURE, payload: error.message })
      );
  }, [id]);

  useEffect(() => {
    fetchSource();
  }, [fetchSource]);

  function editSource() {
    const { name } = sources;
    const newSource = { name: name.trim() };

    httpFetch({
      url: `/source/${id}`,
      method: 'PUT',
      data: newSource
    })
      .then(() => {
        dispatch({ type: types.FAILURE, payload: '' });
        dispatch({
          type: types.MESSAGE,
          payload: 'Source edited successfully'
        });
      })
      .catch((error) =>
        dispatch({
          type: types.FAILURE,
          payload: error.message || error.errors[0].message
        })
      );
  }

  const { fetch, name, error, message } = sources;

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
      <BreadCrumbs
        activeName="Edit"
        breadCrumbs={[
          {
            key: 1,
            path: '/dashboard/sources',
            name: 'Sources'
          }
        ]}
      />

      {fetch && <Spinner />}

      {!fetch && (
        <Section>
          <SectionTitle title="Edit Source" />
          <FormGroup label="Name">
            <Input
              className="form-control"
              value={name}
              onChange={(event) =>
                dispatch({ type: types.NAME, payload: event.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Button onClick={editSource}>Edit</Button>
          </FormGroup>
        </Section>
      )}
    </>
  );
}

export default SourcesEdit;
