// @flow
import React from 'react'
import Input from './Input'
import Button from './Button'

type Props = {
    placeholder?: string,
    btnTitle?: string,
    onChange: () => any,
    searchHandler: () => any
}

Search.defaultProps = {
    btnTitle: 'Search',
    placeholder: 'Busca'
}

function Search (props: Props) {
    const { placeholder, btnTitle, onChange, searchHandler } = props
    return (
        <div className="form-group row">
            <div className="col-lg-6">
                <Input
                    type="text"
                    placeholder={placeholder}
                    className="form-control"
                    onChange={onChange} />
            </div>
            <div className="col-lg-2">
                <Button
                    onClick={searchHandler}
                    className="btn btn-outline-success">
                    {btnTitle}
                </Button>
            </div>
        </div>
    )
}

export default Search