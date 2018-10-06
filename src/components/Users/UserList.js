import React from 'react'

const UserList = props => (
    <div>
        <section className="no-padding-top">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="block">
                            <div className="table-responsive">
                                <button
                                    className="btn btn btn-outline-success mb-3 float-right"
                                    onClick={props.createUser}>
                                    New
                                </button>
                                <table className="table table-striped table-sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>E-mail</th>
                                            <th>Created at</th>
                                            <th>Updated at</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.data.map(user => (
                                            <tr key={user.id}>
                                                <th scope="row">{user.id}</th>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.created_at}</td>
                                                <td>{user.updated_at}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-outline-secondary mr-2">
                                                        <i className="fa fa-edit"></i>
                                                    </button>

                                                    <button className="btn btn-sm btn-outline-danger">
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
)

export default UserList