// @flow
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import distanceInWordsStrict from 'date-fns/formatDistanceStrict';
import parseISO from 'date-fns/parseISO';

import { deleteKeywords } from '../../redux/ducks/keywords';

import { Button, SearchInput, Modal, Section, Table, TR, TD } from '../Common';

type Props = {
  data: Object;
};

function KeywordsList(props: Props) {
  const dispatch = useDispatch();
  const { data } = props;

  const tableColumns = [
    { key: 1, name: '#' },
    { key: 2, name: 'Name' },
    { key: 3, name: 'Created at' },
    { key: 4, name: 'Updated at' },
    { key: 5, name: 'Actions' }
  ];

  const [modalShow, setModal] = useState(false);
  const [keyword, setKeyword] = useState({});

  function modalOpenHandler(keyword: Object) {
    setKeyword(keyword);
    setModal(true);
  }

  function modalCloseHandler() {
    setModal(false);
  }

  function deleteKeyword() {
    dispatch(deleteKeywords(keyword.id));
    setModal(false);
  }

  return (
    <Section>
      <Modal
        show={modalShow}
        title="Delete Keyword"
        okBtnName="Yes"
        onClick={deleteKeyword}
        onClose={modalCloseHandler}
      >
        <p>
          Are you sure that you want to delete{' '}
          <strong>{keyword && keyword.name}</strong> keyword?
        </p>
      </Modal>
      <Link
        className="btn btn-primary mb-3 float-right"
        to="/dashboard/create_keyword"
      >
        New
      </Link>
      <SearchInput path="/dashboard/search_keyword" placeholder="Search" />
      <Table columns={tableColumns}>
        {data.map((keyword) => (
          <TR key={keyword.id}>
            <TD>{keyword.id}</TD>
            <TD>{keyword.name}</TD>
            <TD>
              {distanceInWordsStrict(parseISO(keyword.created_at), Date.now())}
            </TD>
            <TD>
              {distanceInWordsStrict(parseISO(keyword.updated_at), Date.now())}
            </TD>
            <TD>
              <Link
                className="btn btn-sm btn-primary mr-2"
                to={`/dashboard/edit_keyword/${keyword.id}`}
              >
                <i className="fa fa-edit"></i>
              </Link>
              <Button
                className="btn btn-sm btn-primary"
                onClick={() => modalOpenHandler(keyword)}
              >
                <i className="fa fa-trash"></i>
              </Button>
            </TD>
          </TR>
        ))}
      </Table>
    </Section>
  );
}

export default KeywordsList;
