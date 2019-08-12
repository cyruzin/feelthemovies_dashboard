import React from 'react'
import { shallow, mount } from 'enzyme'

import TextArea from '../../../components/Common/TextArea'

it('renders without crashing', () => {
    shallow(<TextArea rows={4} />)
})

describe('<TextArea />', () => {
    it('allows us to set props', () => {
        const wrapper = mount(<TextArea rows={4} />)
        expect(wrapper.props().rows).toBe(4)
    })
})