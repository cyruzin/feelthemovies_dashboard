// @flow
import * as React from 'react'

type Props = {
    children: React.Node
}

function Section (props: Props) {
    const { children } = props
    return (
        <section className="no-padding-top">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="block">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Section