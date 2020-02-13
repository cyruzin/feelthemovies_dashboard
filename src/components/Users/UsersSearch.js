// @flow
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import distanceInWordsStrict from 'date-fns/formatDistanceStrict'
import parseISO from 'date-fns/parseISO'

import { getSearchUsers, deleteUsers } from '../../redux/ducks/users'

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

function UsersSearch (props: Props) {
    const dispatch = useDispatch()
    const [modalShow, setModal] = useState(false)
    const [user, setUsers] = useState({})
    const users = useSelector(state => state.users)
    const { fetch, searchData } = users
    const tableColumns = [
        { key: 1, name: '#' },
        { key: 2, name: 'Name' },
        { key: 3, name: 'E-mail' },
        { key: 4, name: 'Created at' },
        { key: 5, name: 'Updated at' },
        { key: 6, name: 'Actions' }
    ]

    useEffect(() => {
        const { query } = props.location.state
        dispatch(getSearchUsers(query))
    }, [dispatch, props.location.state])


    function modalOpenHandler (users: Object) {
        setUsers(users)
        setModal(true)
    }

    function modalCloseHandler () {
        setModal(false)
    }

    function deleteUser () {
        dispatch(deleteUsers(user.id))
        setModal(false)
        const { push } = props.history
        return push('/dashboard/users')
    }

    return (
        <>
            <BreadCrumbs
                activeName="Search"
                breadCrumbs={[{
                    key: 1,
                    path: '/dashboard/users',
                    name: 'Users'
                }]} />

            {fetch && <Spinner />}

            {!fetch && searchData.length === 0 &&
                <Section>
                    <SearchInput
                        path='/dashboard/search_user'
                        placeholder="Search"
                    />
                    <NoResults message="No Results" />
                </Section>}

            {!fetch && searchData.length > 0 &&
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
                        {searchData.map(user => (
                            <TR key={user.id}>
                                <TD>{user.id}</TD>
                                <TD>{user.name}</TD>
                                <TD>{user.email}</TD>
                                <TD>
                                    {distanceInWordsStrict(
                                        parseISO(user.created_at), Date.now()
                                    )}</TD>
                                <TD>
                                    {distanceInWordsStrict(
                                        parseISO(user.updated_at), Date.now()
                                    )}
                                </TD>
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
                </Section>}
        </>
    )
}

export default UsersSearch