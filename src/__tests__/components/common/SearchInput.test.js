import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { shallow } from 'enzyme'
import SearchInput from '../../../components/Common/SearchInput'

it('renders without crashing', () => {
    shallow(
        <Router>
            <SearchInput />
        </Router>
    )
})