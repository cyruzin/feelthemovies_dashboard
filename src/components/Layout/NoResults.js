import React from 'react'
import { Link } from 'react-router-dom'

export default props => (
    <div>
        <section className="no-padding-top">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="block">
                            {props.withButton ?
                                <div className="col-lg-12 mb-4">
                                    <Link
                                        className="btn btn btn-outline-success mb-3 float-right"
                                        to={props.path}>
                                        New
                                    </Link>
                                </div>
                                :
                                null
                            }
                            <h3 className="text-center text-primary">
                                {props.message}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
)