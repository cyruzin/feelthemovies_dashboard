// @flow
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import distanceInWordsStrict from 'date-fns/distance_in_words_strict'

import { deleteSources } from '../../redux/ducks/sources'

import {
    Button,
    SearchInput,
    Modal,
    Section,
    Table,
    TR,
    TD
} from '../Common'

type Props = {
    data: Object
}

function SourcesList (props: Props) {
    const dispatch = useDispatch()
    const { data } = props

    const tableColumns = [
        { key: 1, name: '#' },
        { key: 2, name: 'Name' },
        { key: 3, name: 'Created at' },
        { key: 4, name: 'Updated at' },
        { key: 5, name: 'Actions' }
    ]

    const [modalShow, setModal] = useState(false)
    const [source, setSource] = useState({})

    function modalOpenHandler (source: Object) {
        setSource(source)
        setModal(true)
    }

    function modalCloseHandler () {
        setModal(false)
    }

    function deleteSource () {
        dispatch(deleteSources(source.id))
        setModal(false)
    }

    return (
        <Section>
            <Modal
                show={modalShow}
                title="Delete Source"
                okBtnName="Yes"
                onClick={deleteSource}
                onClose={modalCloseHandler}>
                <p>
                    Are you sure that you want to
                    delete <strong>{source && source.name}</strong> source?
                </p>
            </Modal>
            <Link
                className="btn btn-primary mb-3 float-right"
                to='/dashboard/create_source'>
                New
            </Link>
            <SearchInput
                path='/dashboard/search_source'
                placeholder="Search"
            />
            <Table columns={tableColumns}>
                {data.map(source => (
                    <TR key={source.id}>
                        <TD>{source.id}</TD>
                        <TD>{source.name}</TD>
                        <TD>{distanceInWordsStrict(source.created_at, Date.now())}</TD>
                        <TD>{distanceInWordsStrict(source.updated_at, Date.now())}</TD>
                        <TD>
                            <Link
                                className="btn btn-sm btn-primary mr-2"
                                to={`/dashboard/edit_source/${source.id}`}>
                                <i className="fa fa-edit"></i>
                            </Link>
                            <Button
                                className="btn btn-sm btn-primary"
                                onClick={() => modalOpenHandler(source)}>
                                <i className="fa fa-trash"></i>
                            </Button>
                        </TD>
                    </TR>
                ))}
            </Table>
        </Section >
    )
}

export default SourcesList