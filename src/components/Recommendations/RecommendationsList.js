import React from 'react'
import { Link } from 'react-router-dom'
import Input from '../Layout/Input'

function RecommendationsList (props) {
    return (
        <div>
            <section className="no-padding-top">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="block">
                                <div className="table-responsive">
                                    <Link
                                        className="btn btn btn-outline-success mb-3 float-right"
                                        to='/dashboard/create_recommendation'>
                                        New
                                    </Link>
                                    <div className="form-group row">
                                        <div className="col-lg-6">
                                        <form>
                                            <Input
                                                type="text"
                                                placeholder="Search"
                                                className="form-control" />
                                        </form>
                                        </div>
                                    </div>
                                    <div className="line"></div>
                                    <table className="table table-striped table-sm">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Title</th>
                                                <th>Type</th>
                                                <th>Status</th>
                                                <th>Created at</th>
                                                <th>Updated at</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
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
}

export default RecommendationsList