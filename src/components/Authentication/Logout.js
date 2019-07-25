import React from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { authenticationReset } from '../../redux/ducks/authentication'

function Logout () {
    const dispatch = useDispatch()
    dispatch(authenticationReset())
    return <Redirect to="/" />
}

export default Logout