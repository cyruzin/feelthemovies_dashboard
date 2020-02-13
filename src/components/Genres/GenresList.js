// @flow
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import distanceInWordsStrict from 'date-fns/formatDistanceStrict'
import parseISO from 'date-fns/parseISO'

import { deleteGenres } from '../../redux/ducks/genres'

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

function GenresList (props: Props) {
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
    const [genre, setGenre] = useState({})

    function modalOpenHandler (genre: Object) {
        setGenre(genre)
        setModal(true)
    }

    function modalCloseHandler () {
        setModal(false)
    }

    function deleteGenre () {
        dispatch(deleteGenres(genre.id))
        setModal(false)
    }

    return (
        <Section>
            <Modal
                show={modalShow}
                title="Delete Genre"
                okBtnName="Yes"
                onClick={deleteGenre}
                onClose={modalCloseHandler}>
                <p>
                    Are you sure that you want to
                    delete <strong>{genre && genre.name}</strong> genre?
                </p>
            </Modal>
            <Link
                className="btn btn-primary mb-3 float-right"
                to='/dashboard/create_genre'>
                New
            </Link>
            <SearchInput
                path='/dashboard/search_genre'
                placeholder="Search"
            />
            <Table columns={tableColumns}>
                {data.map(genre => (
                    <TR key={genre.id}>
                        <TD>{genre.id}</TD>
                        <TD>{genre.name}</TD>
                        <TD>
                            {distanceInWordsStrict(
                                parseISO(genre.created_at),
                                Date.now())
                            }
                        </TD>
                        <TD>
                            {distanceInWordsStrict(
                                parseISO(genre.updated_at),
                                Date.now())
                            }
                        </TD>
                        <TD>
                            <Link
                                className="btn btn-sm btn-primary mr-2"
                                to={`/dashboard/edit_genre/${genre.id}`}>
                                <i className="fa fa-edit"></i>
                            </Link>
                            <Button
                                className="btn btn-sm btn-primary"
                                onClick={() => modalOpenHandler(genre)}>
                                <i className="fa fa-trash"></i>
                            </Button>
                        </TD>
                    </TR>
                ))}
            </Table>
        </Section >
    )
}

export default GenresList