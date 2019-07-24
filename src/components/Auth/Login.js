import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAuth } from '../../store/actions/AuthActions'
import Input from '../Layout/Input'
import Button from '../Layout/Button'
import { loadJs } from '../../util/helpers'

function Auth (props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    useEffect(() => {
        loadJs()
        const { push } = props.history
        if (auth.authorized) push('/dashboard/recommendations')
    }, [email, password, error, auth, props])

    function loginHandler (event) {
        event.preventDefault()
        errorHandler()
        dispatch(fetchAuth({ email, password }))
    }

    function errorHandler () {
        if (email === '' || password === '') {
            setError('Please, fill all fields')
            return
        }
        setError('')
    }

    return (
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
                                    {error !== '' || auth.error !== '' ?
                                        <div className="form-group">
                                            <label className="form-control-label text-primary">
                                                {error || auth.error}
                                            </label>
                                        </div>
                                        : null
                                    }
                                    <form>
                                        <Input
                                            type="text"
                                            name="email"
                                            label="E-mail"
                                            value={email}
                                            onChange={e => setEmail(e.target.value.trim())}
                                            onBlur={e => setEmail(e.target.value.trim())}
                                            className="input-material"
                                        />
                                        <Input
                                            type="password"
                                            name="password"
                                            label="Password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value.trim())}
                                            onBlur={e => setPassword(e.target.value.trim())}
                                            className="input-material"
                                        />
                                        <Button
                                            type="submit"
                                            size="primary"
                                            title="Login"
                                            onClick={loginHandler} />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth