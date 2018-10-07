import React from 'react'
import { Link } from 'react-router-dom'

const UserEdit = props => (
    <div>
        <div className="container-fluid">
            <ul className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link onClick={props.listUsers} to='/dashboard/users'>Users</Link>
                </li>
                <li className="breadcrumb-item active">Edit</li>
            </ul>
        </div>
        <section className="no-padding-top">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">

                        <div className="block">
                            <div className="title">
                                <strong>User edit</strong>
                            </div>
                            <div className="block-body">
                                <div className="form-group row">
                                    <label className="col-sm-3 form-control-label">Name</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="line"></div>

                                <div className="form-group row">
                                    <label className="col-sm-3 form-control-label">E-mail</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="line"></div>

                                <div className="form-group row">
                                    <label className="col-sm-3 form-control-label">Password</label>
                                    <div className="col-sm-9">
                                        <input type="password" className="form-control" />
                                    </div>
                                </div>
                                <div className="line"></div>

                                <div className="form-group row">
                                    <div className="col-sm-9 ml-auto">
                                        <button className="btn btn-primary">
                                            Save
                                                </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    </div>
)

export default UserEdit