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

function UsersEdit(props: Props) {
  const [users, dispatch] = useReducer(reducer, initialState);
  const { id } = props.match.params;

  const fetchUser = useCallback(() => {
    dispatch({ type: types.FETCH });
    httpFetch({
      url: `/user/${id}`,
      method: 'GET'
    })
      .then((response) => dispatch({ type: types.USER, payload: response }))
      .catch((error) =>
        dispatch({ type: types.FAILURE, payload: error.message })
      );
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  function editUser() {
    const { name, email, password } = users;
    const newUser = {
      name: name.trim(),
      email: email.trim(),
      password: password.trim()
    };

    httpFetch({
      url: `/user/${id}`,
      method: 'PUT',
      data: newUser
    })
      .then(() => {
        dispatch({ type: types.FAILURE, payload: '' });
        dispatch({ type: types.MESSAGE, payload: 'User edited successfully' });
      })
      .catch((error) =>
        dispatch({
          type: types.FAILURE,
          payload: error.message || error.errors[0].message
        })
      );
  }

  const { fetch, name, email, password, error, message } = users;

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
            path: '/dashboard/users',
            name: 'Users'
          }
        ]}
      />

      {fetch && <Spinner />}

      {!fetch && (
        <Section>
          <SectionTitle title="Edit User" />
          <FormGroup label="Name">
            <Input
              className="form-control"
              value={name}
              onChange={(event) =>
                dispatch({ type: types.NAME, payload: event.target.value })
              }
            />
          </FormGroup>
          <FormGroup label="E-mail">
            <Input
              className="form-control"
              value={email}
              onChange={(event) =>
                dispatch({ type: types.EMAIL, payload: event.target.value })
              }
            />
          </FormGroup>
          <FormGroup label="Password">
            <Input
              type="password"
              className="form-control"
              value={password}
              onChange={(event) =>
                dispatch({ type: types.PASSWORD, payload: event.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Button onClick={editUser}>Edit</Button>
          </FormGroup>
        </Section>
      )}
    </>
  );
}

export default UsersEdit;
