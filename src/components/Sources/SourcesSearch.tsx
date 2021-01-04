// @flow
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import distanceInWordsStrict from 'date-fns/formatDistanceStrict';
import parseISO from 'date-fns/parseISO';

import { getSearchSources, deleteSources } from '../../redux/ducks/sources';

import {
  Button,
  BreadCrumbs,
  Modal,
  Section,
  SearchInput,
  Spinner,
  NoResults,
  Table,
  TR,
  TD
} from '../Common';

type Props = {
  location: Object;
  history: Object;
};

function SourcesSearch(props: Props) {
  const dispatch = useDispatch();
  const [modalShow, setModal] = useState(false);
  const [source, setSource] = useState({});
  const sources = useSelector((state) => state.sources);
  const { fetch, searchData } = sources;
  const tableColumns = [
    { key: 1, name: '#' },
    { key: 2, name: 'Name' },
    { key: 3, name: 'Created at' },
    { key: 4, name: 'Updated at' },
    { key: 5, name: 'Actions' }
  ];

  useEffect(() => {
    const { query } = props.location.state;
    dispatch(getSearchSources(query));
  }, [dispatch, props.location.state]);

  function modalOpenHandler(sources: Object) {
    setSource(sources);
    setModal(true);
  }

  function modalCloseHandler() {
    setModal(false);
  }

  function deleteSource() {
    dispatch(deleteSources(source.id));
    setModal(false);
    const { push } = props.history;
    return push('/dashboard/sources');
  }

  return (
    <>
      <BreadCrumbs
        activeName="Search"
        breadCrumbs={[
          {
            key: 1,
            path: '/dashboard/sources',
            name: 'Sources'
          }
        ]}
      />

      {fetch && <Spinner />}

      {!fetch && searchData.length === 0 && (
        <Section>
          <SearchInput path="/dashboard/search_source" placeholder="Search" />
          <NoResults message="No Results" />
        </Section>
      )}

      {!fetch && searchData.length > 0 && (
        <Section>
          <Modal
            show={modalShow}
            title="Delete Source"
            okBtnName="Yes"
            onClick={deleteSource}
            onClose={modalCloseHandler}
          >
            <p>
              Are you sure that you want to delete{' '}
              <strong>{source && source.title}</strong> source?
            </p>
          </Modal>
          <Link
            className="btn btn-primary mb-3 float-right"
            to="/dashboard/create_source"
          >
            New
          </Link>
          <SearchInput path="/dashboard/search_source" placeholder="Search" />
          <Table columns={tableColumns}>
            {searchData.map((source) => (
              <TR key={source.id}>
                <TD>{source.id}</TD>
                <TD>{source.name}</TD>
                <TD>
                  {distanceInWordsStrict(
                    parseISO(source.created_at),
                    Date.now()
                  )}
                </TD>
                <TD>
                  {distanceInWordsStrict(
                    parseISO(source.updated_at),
                    Date.now()
                  )}
                </TD>
                <TD>
                  <Link
                    className="btn btn-sm btn-primary mr-2"
                    to={`/dashboard/edit_source/${source.id}`}
                  >
                    <i className="fa fa-edit"></i>
                  </Link>
                  <Button
                    className="btn btn-sm btn-primary"
                    onClick={() => modalOpenHandler(source)}
                  >
                    <i className="fa fa-trash"></i>
                  </Button>
                </TD>
              </TR>
            ))}
          </Table>
        </Section>
      )}
    </>
  );
}

export default SourcesSearch;
