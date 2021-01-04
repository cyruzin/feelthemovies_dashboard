// @flow
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import distanceInWordsStrict from 'date-fns/formatDistanceStrict';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

import { deleteRecommendationItems } from '../../redux/ducks/recommendationItems';
import { capitalizeFirstLetter } from '../../util/helpers';

import { Section, BreadCrumbs, Button, Modal, Table, TR, TD } from '../Common';

type Props = {
  data: Object;
  id: number | string;
};

function RecommendationItemsList(props: Props) {
  const { id, data } = props;
  const dispatch = useDispatch();

  const [modalShow, setModal] = useState(false);
  const [item, setRecommendationItem] = useState({});

  const tableColumns = [
    { key: 1, name: '#' },
    { key: 2, name: 'TMDb ID' },
    { key: 3, name: 'Name' },
    { key: 4, name: 'Year' },
    { key: 5, name: 'Type' },
    { key: 6, name: 'Created at' },
    { key: 7, name: 'Updated at' },
    { key: 8, name: 'Actions' }
  ];

  function modalOpenHandler(item: Object) {
    setRecommendationItem(item);
    setModal(true);
  }

  function modalCloseHandler() {
    setModal(false);
  }

  function deleteRecommendationItem() {
    dispatch(deleteRecommendationItems(item.id, id));
    setModal(false);
  }

  return (
    <>
      <BreadCrumbs
        breadCrumbs={[
          {
            key: 1,
            path: '/dashboard/recommendations',
            name: 'Recommendations'
          }
        ]}
        activeName="Items"
      />
      <Section>
        <Modal
          show={modalShow}
          title="Delete Recommendation"
          okBtnName="Yes"
          onClick={deleteRecommendationItem}
          onClose={modalCloseHandler}
        >
          <p>
            Are you sure that you want to delete{' '}
            <strong>{item && item.name}</strong> item?
          </p>
        </Modal>
        <Link
          className="btn btn-primary mb-3 float-right"
          to={`/dashboard/create_item/${id}`}
        >
          New
        </Link>
        <Table columns={tableColumns}>
          {data.map((item) => (
            <TR key={item.id}>
              <TD>{item.id}</TD>
              <TD>{item.tmdb_id}</TD>
              <TD>{item.name}</TD>
              <TD>{format(new Date(item.year), 'yyyy')}</TD>
              <TD>{capitalizeFirstLetter(item.media_type)}</TD>
              <TD>
                {distanceInWordsStrict(parseISO(item.created_at), Date.now())}
              </TD>
              <TD>
                {distanceInWordsStrict(parseISO(item.updated_at), Date.now())}
              </TD>
              <TD>
                <Link
                  className="btn btn-sm btn-primary mr-2"
                  to={`/dashboard/edit_item/${item.id}`}
                >
                  <i className="fa fa-edit"></i>
                </Link>
                <Button
                  className="btn btn-sm btn-primary"
                  onClick={() => modalOpenHandler(item)}
                >
                  <i className="fa fa-trash"></i>
                </Button>
              </TD>
            </TR>
          ))}
        </Table>
      </Section>
    </>
  );
}

export default RecommendationItemsList;
