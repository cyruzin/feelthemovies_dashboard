import React from 'react'
import Spinner from '../../assets/img/Loading.gif'

export default () => (
    <div>
        <section className="no-padding-top">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <img src={Spinner} alt="Loading" width="60" height="60" />
                    </div>
                </div>
            </div>
        </section>
    </div>
)