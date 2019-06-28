import React from 'react'

const LoginInfo = props => (
    <div className="login-page">
        <div className="container d-flex align-items-center">

            <div className="form-holder has-shadow">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="info d-flex align-items-center">
                            <div className="content">
                                <div className="logo">
                                    <h1>Feel the Movies</h1>
                                </div>
                                <p>Can You Feel It?</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 bg-white">
                        <div className="form d-flex align-items-center">
                            <div className="content">
                                {props.auth.error !== '' ?
                                    <div className="form-group">
                                        <label className="form-control-label text-primary">
                                            {props.auth.error}
                                        </label>
                                    </div>
                                    :
                                    null
                                }

                                <form>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            onKeyUp={props.setEmail}
                                            ref={props.emailRef}
                                            className="input-material" />
                                        <label
                                            className="label-material">
                                            E-mail
                                    </label>
                                    </div>

                                    <div className="form-group">
                                        <input
                                            type="password"
                                            onKeyUp={props.setPassword}
                                            ref={props.passwordRef}
                                            className="input-material" />
                                        <label
                                            className="label-material">
                                            Password
                                        </label>
                                    </div>
                                    <button
                                        type="submit"
                                        onClick={props.fetchAuth}
                                        className="btn btn-primary"
                                    >
                                        Login
                                    </button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default LoginInfo