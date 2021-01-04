import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUsers } from '../../redux/ducks/users';

import UsersList from './UsersList';

import { Alert, NoResults, SectionHeader, Spinner } from '../Common';

function Users() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { fetch, data, error, message } = users;

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <Alert message={error} variant="error" showAlert={error !== ''} />
      <Alert message={message} variant="success" showAlert={message !== ''} />
      <SectionHeader title="Users" />
      {fetch && <Spinner />}

      {!fetch && data.length === 0 && (
        <NoResults
          message="No Results"
          withButton
          path="/dashboard/create_user"
        />
      )}

      {!fetch && data.length > 0 && <UsersList data={data} />}
    </>
  );
}

export default Users;
