import React from 'react'

export default props => (
    <div>
        <section className="no-padding-top">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="block">
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