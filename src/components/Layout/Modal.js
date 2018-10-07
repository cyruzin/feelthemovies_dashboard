import React from 'react'
import { Link } from 'react-router-dom'

const Modal = props => (
    <section className="no-padding-top">
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-8">
                    <div className="statistic-block block">
                        <div className="progress-details">
                            <h4 className="text-primary">
                                {props.message}
                            </h4>
                            <div className="mt-3">
                                <Link
                                    to={props.cancelPath}
                                    className="btn btn-outline-secondary mr-2">
                                    No
                                </Link>
                                <button
                                    className="btn btn-outline-primary"
                                    onClick={props.action}>
                                    Yes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
)

export default Modal