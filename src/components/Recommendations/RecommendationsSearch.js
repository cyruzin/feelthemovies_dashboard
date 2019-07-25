import React from 'react'
import { Link } from 'react-router-dom'

function RecommendationsSearch () {

    return (
        <div>
            <div className="container-fluid">
                <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to='/dashboard/recommendations'>
                            Recommendations
                        </Link>
                    </li>
                    <li className="breadcrumb-item active">Search</li>
                </ul>
            </div>
            <section className="no-padding-top">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="block">
                                <div className="table-responsive">
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

export default RecommendationsSearch