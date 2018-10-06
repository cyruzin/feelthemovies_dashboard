import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UserRegistration from './UserRegistration'

class Users extends Component {

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="container-fluid">
                        <h2 className="h5 no-margin-bottom">Users</h2>
                    </div>
                </div>
                <div className="container-fluid">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to='/dashboard/home'>Home</Link>
                        </li>
                        <li className="breadcrumb-item active">Users</li>
                    </ul>
                </div>
                <UserRegistration />
            </div>
        )
    }
}

export default Users