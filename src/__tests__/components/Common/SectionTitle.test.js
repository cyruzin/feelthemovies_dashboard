import React from 'react'
import { shallow, mount } from 'enzyme'

import SectionTitle from '../../../components/Common/SectionTitle'

it('renders without crashing', () => {
    shallow(<SectionTitle title="Test" />)
})

describe('<SectionTitle />', () => {
    it('allows us to set props', () => {
        const wrapper = mount(<SectionTitle title="Test Title" />)
        expect(wrapper.props().title).toEqual('Test Title')
    })
})