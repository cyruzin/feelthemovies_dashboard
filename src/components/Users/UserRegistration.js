import React from 'react'

const UserRegistration = props => (
    <div>
        <section className="no-padding-top">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">

                        <div className="block">
                            <div className="title">
                                <strong>User registration</strong>
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

export default UserRegistration