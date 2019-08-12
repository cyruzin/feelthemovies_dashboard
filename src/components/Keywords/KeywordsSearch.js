// @flow
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import distanceInWordsStrict from 'date-fns/distance_in_words_strict'

import { getSearchKeywords, deleteKeywords } from '../../redux/ducks/keywords'

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
} from '../Common'

type Props = {
    location: Object,
    history: Object
}

function KeywordsSearch (props: Props) {
    const dispatch = useDispatch()
    const [modalShow, setModal] = useState(false)
    const [keyword, setKeyword] = useState({})
    const keywords = useSelector(state => state.keywords)
    const { fetch, searchData } = keywords
    const tableColumns = [
        { key: 1, name: '#' },
        { key: 2, name: 'Name' },
        { key: 3, name: 'Created at' },
        { key: 4, name: 'Updated at' },
        { key: 5, name: 'Actions' }
    ]

    useEffect(() => {
        const { query } = props.location.state
        dispatch(getSearchKeywords(query))
    }, [dispatch, props.location.state])


    function modalOpenHandler (keywords: Object) {
        setKeyword(keywords)
        setModal(true)
    }

    function modalCloseHandler () {
        setModal(false)
    }

    function deleteKeyword () {
        dispatch(deleteKeywords(keyword.id))
        setModal(false)
        const { push } = props.history
        return push('/dashboard/keywords')
    }

    return (
        <>
            <BreadCrumbs
                activeName="Search"
                breadCrumbs={[{
                    key: 1,
                    path: '/dashboard/keywords',
                    name: 'Keywords'
                }]} />

            {fetch && <Spinner />}

            {!fetch && searchData.length === 0 &&
                <Section>
                    <SearchInput
                        path='/dashboard/search_keyword'
                        placeholder="Search"
                    />
                    <NoResults message="No Results" />
                </Section>}

            {!fetch && searchData.length > 0 &&
                <Section>
                    <Modal
                        show={modalShow}
                        title="Delete Keyword"
                        okBtnName="Yes"
                        onClick={deleteKeyword}
                        onClose={modalCloseHandler}>
                        <p>
                            Are you sure that you want to
                        delete keyword <strong>{keyword && keyword.title}</strong> keyword?
                        </p>
                    </Modal>
                    <Link
                        className="btn btn-primary mb-3 float-right"
                        to='/dashboard/create_keyword'>
                        New
                    </Link>
                    <SearchInput
                        path='/dashboard/search_keyword'
                        placeholder="Search"
                    />
                    <Table columns={tableColumns}>
                        {searchData.map(keyword => (
                            <TR key={keyword.id}>
                                <TD>{keyword.id}</TD>
                                <TD>{keyword.name}</TD>
                                <TD>{distanceInWordsStrict(keyword.created_at, Date.now())}</TD>
                                <TD>{distanceInWordsStrict(keyword.updated_at, Date.now())}</TD>
                                <TD>
                                    <Link
                                        className="btn btn-sm btn-primary mr-2"
                                        to={`/dashboard/edit_keyword/${keyword.id}`}>
                                        <i className="fa fa-edit"></i>
                                    </Link>
                                    <Button
                                        className="btn btn-sm btn-primary"
                                        onClick={() => modalOpenHandler(keyword)}>
                                        <i className="fa fa-trash"></i>
                                    </Button>
                                </TD>
                            </TR>
                        ))}
                    </Table>
                </Section>}
        </>
    )
}

export default KeywordsSearch