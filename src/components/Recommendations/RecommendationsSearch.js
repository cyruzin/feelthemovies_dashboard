import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class RecommendationsSearch extends Component {

    render() {
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
            </div>
        )
    }
}

export default RecommendationsSearch