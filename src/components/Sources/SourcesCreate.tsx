// @flow
import React, { useReducer } from 'react';

import { types, initialState, reducer } from './duck';
import { httpFetch } from '../../util/request';

import {
  Alert,
  BreadCrumbs,
  Button,
  Input,
  FormGroup,
  Section,
  SectionTitle
} from '../Common';

function SourcesCreate() {
  const [sources, dispatch] = useReducer(reducer, initialState);

  function createSource() {
    const { name } = sources;
    const newSource = { name: name.trim() };

    httpFetch({
      url: '/source',
      method: 'POST',
      data: newSource
    })
      .then(() => {
        dispatch({ type: types.RESET });
        dispatch({
          type: types.MESSAGE,
          payload: 'Source created successfully'
        });
      })
      .catch((error) =>
        dispatch({
          type: types.FAILURE,
          payload: error.message || error.errors[0].message
        })
      );
  }

  const { name, error, message } = sources;

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
        activeName="Create"
        breadCrumbs={[
          {
            key: 1,
            path: '/dashboard/sources',
            name: 'Sources'
          }
        ]}
      />
      <Section>
        <SectionTitle title="Create Source" />
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
          <Button onClick={createSource}>Create</Button>
        </FormGroup>
      </Section>
    </>
  );
}

export default SourcesCreate;
