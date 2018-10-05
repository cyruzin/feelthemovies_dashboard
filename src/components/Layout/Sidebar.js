import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const Siderbar = props => {
    const activeCheck = pathname => {
        if (pathname === props.location.pathname) {
            return 'active'
        }
        return ''
    }
    return (
        <nav id="sidebar">
            <div className="sidebar-header d-flex align-items-center">
                <div className="title">
                    <h1 className="h5">Cyro Dubeux</h1>
                    <p>Admin</p>
                </div>
            </div>
            <span className="heading">Main</span>
            <ul className="list-unstyled">
                <li className={activeCheck('/dashboard/home')}>
                    <Link to='/dashboard/home'>
                        <i className="fa fa-home"></i>Home
                    </Link>
                </li>
                <li className={activeCheck('/dashboard/users')}>
                    <Link to='/dashboard/users'> <i className="fa fa-user"></i>Users </Link>
                </li>
                <li className={activeCheck('/dashboard/recommendations')}>
                    <Link to='/dashboard/recommendations'>
                        <i className="fa fa-thumbs-up"></i>Recommendations
                </Link>
                </li>
                <li className={activeCheck('/dashboard/genres')}>
                    <Link to='/dashboard/genres'> <i className="fa fa-tags"></i>Genres </Link>
                </li>
                <li className={activeCheck('/dashboard/keywords')}>
                    <Link to='/dashboard/keywords'> <i className="fa fa-hashtag"></i>Keywords </Link>
                </li>
                <li className={activeCheck('/dashboard/sources')}>
                    <Link to='/dashboard/sources'> <i className="fa fa-play-circle"></i>Sources </Link>
                </li>
                {/* <li>
                <a href="#exampledropdownDropdown" aria-expanded="false" data-toggle="collapse">
                    <i className="fa fa-thumbs-up"></i>Recommendations
                </a>
                <ul id="exampledropdownDropdown" className="collapse list-unstyled ">
                    <li><a href="#">Page</a></li>
                    <li><a href="#">Page</a></li>
                    <li><a href="#">Page</a></li>
                </ul>
            </li> */}
            </ul>
        </nav >
    )
}

export default withRouter(Siderbar)