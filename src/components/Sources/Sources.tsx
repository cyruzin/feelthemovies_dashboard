import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSources } from '../../redux/ducks/sources';

import SourcesList from './SourcesList';

import { Alert, NoResults, SectionHeader, Spinner } from '../Common';

function Sources() {
  const sources = useSelector((state) => state.sources);
  const dispatch = useDispatch();
  const { fetch, data, error, message } = sources;

  useEffect(() => {
    dispatch(getSources());
  }, [dispatch]);

  return (
    <>
      <Alert message={error} variant="error" showAlert={error !== ''} />
      <Alert message={message} variant="success" showAlert={message !== ''} />
      <SectionHeader title="Sources" />
      {fetch && <Spinner />}

      {!fetch && data.length === 0 && (
        <NoResults
          message="No Results"
          withButton
          path="/dashboard/create_source"
        />
      )}

      {!fetch && data.length > 0 && <SourcesList data={data} />}
    </>
  );
}

export default Sources;
