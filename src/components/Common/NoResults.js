// @flow
import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
    message: string,
    withButton?: bool,
    path?: string
}

function NoResults (props: Props) {
    const { message, withButton, path } = props
    return (
        <section className="no-padding-top">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="block">
                            {withButton &&
                                <div className="col-lg-12 mb-4">
                                    <Link
                                        className="btn btn btn-outline-success mb-3 float-right"
                                        to={path}>
                                        New
                                    </Link>
                                </div>
                            }
                            <h3 className="text-center text-primary">
                                {message}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NoResults