import React from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { resetAuthentication } from '../../redux/ducks/authentication'

function Logout () {
    const dispatch = useDispatch()
    dispatch(resetAuthentication())
    return <Redirect to="/" />
}

export default Logout