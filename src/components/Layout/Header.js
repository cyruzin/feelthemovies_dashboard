import React from 'react'

const Header = () => (
    <div>
        <header className="header">
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid d-flex align-items-center justify-content-between">
                    <div className="navbar-header">
                        <a href="index.html" className="navbar-brand">
                            <div className="brand-text brand-big visible text-uppercase">
                                <strong className="text-primary">
                                    Feel the
                            </strong>
                                <strong>Movies</strong>
                            </div>
                            <div className="brand-text brand-sm">
                                <strong className="text-primary">FT</strong>
                                <strong>M</strong>
                            </div>
                        </a>
                        <button className="sidebar-toggle">
                            <i className="fa fa-long-arrow-left"></i>
                        </button>
                    </div>
                    <div className="right-menu list-inline no-margin-bottom">
                        <div
                            className="list-inline-item logout"
                            style={{ cursor: 'pointer' }}>
                            Logout <i className="fa fa-sign-out" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    </div>
)

export default Header