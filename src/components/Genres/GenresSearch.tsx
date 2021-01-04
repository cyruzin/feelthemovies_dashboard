// @flow
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import distanceInWordsStrict from 'date-fns/formatDistanceStrict';
import parseISO from 'date-fns/parseISO';

import { getSearchGenres, deleteGenres } from '../../redux/ducks/genres';

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

function GenresSearch(props: Props) {
  const dispatch = useDispatch();
  const [modalShow, setModal] = useState(false);
  const [genre, setGenre] = useState({});
  const genres = useSelector((state) => state.genres);
  const { fetch, searchData } = genres;
  const tableColumns = [
    { key: 1, name: '#' },
    { key: 2, name: 'Name' },
    { key: 3, name: 'Created at' },
    { key: 4, name: 'Updated at' },
    { key: 5, name: 'Actions' }
  ];

  useEffect(() => {
    const { query } = props.location.state;
    dispatch(getSearchGenres(query));
  }, [dispatch, props.location.state]);

  function modalOpenHandler(genres: Object) {
    setGenre(genres);
    setModal(true);
  }

  function modalCloseHandler() {
    setModal(false);
  }

  function deleteGenre() {
    dispatch(deleteGenres(genre.id));
    setModal(false);
    const { push } = props.history;
    return push('/dashboard/genres');
  }

  return (
    <>
      <BreadCrumbs
        activeName="Search"
        breadCrumbs={[
          {
            key: 1,
            path: '/dashboard/genres',
            name: 'Genres'
          }
        ]}
      />

      {fetch && <Spinner />}

      {!fetch && searchData.length === 0 && (
        <Section>
          <SearchInput path="/dashboard/search_genre" placeholder="Search" />
          <NoResults message="No Results" />
        </Section>
      )}

      {!fetch && searchData.length > 0 && (
        <Section>
          <Modal
            show={modalShow}
            title="Delete Genre"
            okBtnName="Yes"
            onClick={deleteGenre}
            onClose={modalCloseHandler}
          >
            <p>
              Are you sure that you want to delete{' '}
              <strong>{genre && genre.title}</strong> genre?
            </p>
          </Modal>
          <Link
            className="btn btn-primary mb-3 float-right"
            to="/dashboard/create_genre"
          >
            New
          </Link>
          <SearchInput path="/dashboard/search_genre" placeholder="Search" />
          <Table columns={tableColumns}>
            {searchData.map((genre) => (
              <TR key={genre.id}>
                <TD>{genre.id}</TD>
                <TD>{genre.name}</TD>
                <TD>
                  {distanceInWordsStrict(
                    parseISO(genre.created_at),
                    Date.now()
                  )}
                </TD>
                <TD>
                  {distanceInWordsStrict(
                    parseISO(genre.updated_at),
                    Date.now()
                  )}
                </TD>
                <TD>
                  <Link
                    className="btn btn-sm btn-primary mr-2"
                    to={`/dashboard/edit_genre/${genre.id}`}
                  >
                    <i className="fa fa-edit"></i>
                  </Link>
                  <Button
                    className="btn btn-sm btn-primary"
                    onClick={() => modalOpenHandler(genre)}
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

export default GenresSearch;
