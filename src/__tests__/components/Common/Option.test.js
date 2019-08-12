import React from 'react'
import { shallow, mount } from 'enzyme'

import Option from '../../../components/Common/Option'
import Button from '../../../components/Common/Button'

it('renders without crashing', () => {
    shallow(<Option value="test">Test</Option>)
})

describe('<Option />', () => {
    it('allows us to set props', () => {
        const wrapper = mount(<Option value="Test Value" />)
        expect(wrapper.props().value).toEqual('Test Value')
    })

    it('renders children components', () => {
        const wrapper = mount(
            <Option value="test" >
                <Button>Test</Button>
            </Option>
        )
        expect(wrapper.find('Button').length).toEqual(1)
    })
})