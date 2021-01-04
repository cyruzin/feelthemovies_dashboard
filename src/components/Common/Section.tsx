import React from 'react'

interface Props {
    children: React.ReactNode;
}

function Section(props: Props) {
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