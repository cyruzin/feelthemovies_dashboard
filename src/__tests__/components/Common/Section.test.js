import React from 'react'
import { shallow, mount } from 'enzyme'

import Section from '../../../components/Common/Section'
import Input from '../../../components/Common/Input'

it('renders without crashing', () => {
    shallow(<Section />)
})

describe('<Section />', () => {
    it('renders children components', () => {
        const wrapper = mount(
            <Section>
                <Input type="text" />
            </Section>
        )
        expect(wrapper.find('Input').length).toEqual(1)
    })
})