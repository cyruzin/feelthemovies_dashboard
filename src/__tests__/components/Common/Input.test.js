import React from 'react'
import { shallow, mount } from 'enzyme'

import Input from '../../../components/Common/Input'

it('renders without crashing', () => {
    shallow(<Input type="text" />)
})

describe('<Input />', () => {
    it('allows us to set props', () => {
        const wrapper = mount(<Input type="password" />)
        expect(wrapper.props().type).toEqual('password')
        wrapper.setProps({ type: 'checkbox' })
        expect(wrapper.props().type).toEqual('checkbox')
        wrapper.setProps({ placeholder: 'Search' })
        expect(wrapper.props().placeholder).toEqual('Search')
    })
})