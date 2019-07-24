import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useReactRouter from 'use-react-router'

function Siderbar () {
    const { location } = useReactRouter()
    const user = useSelector(state => state.authentication.user)

    function activeCheck (pathname) {
        if (pathname === location.pathname) return 'active'
        return ''
    }

    return (
        <nav id="sidebar">
            <div className="sidebar-header d-flex align-items-center">
                <div className="title">
                    <h1 className="h5">Admin</h1>
                    <p>{user.name}</p>
                </div>
            </div>
            <span className="heading">Main</span>
            <ul className="list-unstyled">
                <li className={activeCheck('/dashboard/users')}>
                    <Link to='/dashboard/users'><i className="fa fa-user"></i>Users</Link>
                </li>
                <li className={activeCheck('/dashboard/recommendations')}>
                    <Link to='/dashboard/recommendations'><i className="fa fa-thumbs-up"></i>Recommendations</Link>
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
            </ul>
        </nav>
    )
}

export default Siderbar