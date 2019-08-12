// @flow
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import distanceInWordsStrict from 'date-fns/distance_in_words_strict'

import { deleteUsers } from '../../redux/ducks/users'

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

function UsersList (props: Props) {
    const dispatch = useDispatch()
    const { data } = props

    const tableColumns = [
        { key: 1, name: '#' },
        { key: 2, name: 'Name' },
        { key: 3, name: 'E-mail' },
        { key: 4, name: 'Created at' },
        { key: 5, name: 'Updated at' },
        { key: 6, name: 'Actions' }
    ]

    const [modalShow, setModal] = useState(false)
    const [user, setUser] = useState({})

    function modalOpenHandler (user: Object) {
        setUser(user)
        setModal(true)
    }

    function modalCloseHandler () {
        setModal(false)
    }

    function deleteUser () {
        dispatch(deleteUsers(user.id))
        setModal(false)
    }

    return (
        <Section>
            <Modal
                show={modalShow}
                title="Delete User"
                okBtnName="Yes"
                onClick={deleteUser}
                onClose={modalCloseHandler}>
                <p>
                    Are you sure that you want to
                    delete user <strong>{user && user.name}</strong>?
                </p>
            </Modal>
            <Link
                className="btn btn-primary mb-3 float-right"
                to='/dashboard/create_user'>
                New
            </Link>
            <SearchInput
                path='/dashboard/search_user'
                placeholder="Search"
            />
            <Table columns={tableColumns}>
                {data.map(user => (
                    <TR key={user.id}>
                        <TD>{user.id}</TD>
                        <TD>{user.name}</TD>
                        <TD>{user.email}</TD>
                        <TD>{distanceInWordsStrict(user.created_at, Date.now())}</TD>
                        <TD>{distanceInWordsStrict(user.updated_at, Date.now())}</TD>
                        <TD>
                            <Link
                                className="btn btn-sm btn-primary mr-2"
                                to={`/dashboard/edit_user/${user.id}`}>
                                <i className="fa fa-edit"></i>
                            </Link>
                            <Button
                                className="btn btn-sm btn-primary"
                                onClick={() => modalOpenHandler(user)}>
                                <i className="fa fa-trash"></i>
                            </Button>
                        </TD>
                    </TR>
                ))}
            </Table>
        </Section >
    )
}

export default UsersList