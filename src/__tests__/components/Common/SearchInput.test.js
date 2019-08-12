import React from 'react'
import { shallow, mount } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'

import SearchInput from '../../../components/Common/SearchInput'

it('renders without crashing', () => {
    shallow(
        <Router>
            <SearchInput />
        </Router>
    )
})

describe('<SearchInput />', () => {
    it('allows us to set props', () => {
        const wrapper = mount(
            <Router>
                <SearchInput path="/test" placeholder="Search test" />)
            </Router>
        )
        expect(wrapper.children().find('SearchInput').props().path).toEqual('/test')
        expect(wrapper.children().find('SearchInput').props().placeholder).toEqual('Search test')
    })
})