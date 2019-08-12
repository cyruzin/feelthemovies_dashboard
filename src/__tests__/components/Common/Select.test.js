import React from 'react'
import { shallow, mount } from 'enzyme'

import Select from '../../../components/Common/Select'
import Option from '../../../components/Common/Option'

it('renders without crashing', () => {
    shallow(
        <Select>
            <Option value="test">Test</Option>
        </Select>
    )
})

describe('<Select />', () => {
    it('renders children components', () => {
        const wrapper = mount(
            <Select>
                <Option value="test">Test</Option>
            </Select>
        )
        expect(wrapper.find('Option').length).toEqual(1)
    })
})