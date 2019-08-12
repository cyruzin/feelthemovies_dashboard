import React from 'react'
import { shallow, mount } from 'enzyme'

import InputLabel from '../../../components/Common/InputLabel'

it('renders without crashing', () => {
    shallow(<InputLabel type="text" />)
})

describe('<InputLabel />', () => {
    it('allows us to set props', () => {
        const wrapper = mount(<InputLabel type="password" />)
        expect(wrapper.props().type).toEqual('password')
        wrapper.setProps({ type: 'checkbox' })
        expect(wrapper.props().type).toEqual('checkbox')
        wrapper.setProps({ placeholder: 'Search' })
        expect(wrapper.props().placeholder).toEqual('Search')
        wrapper.setProps({ label: 'Image' })
        expect(wrapper.props().label).toEqual('Image')
    })
})