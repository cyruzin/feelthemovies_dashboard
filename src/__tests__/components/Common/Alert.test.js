import React from 'react'
import { shallow, mount } from 'enzyme'
import Alert from '../../../components/Common/Alert'

it('renders without crashing', () => {
    shallow(<Alert variant="success" message="Test Message" />)
})

describe('<Alert />', () => {
    it('allows us to set props', () => {
        const wrapper = mount(<Alert variant="success" message="Test Message" />)
        expect(wrapper.props().message).toEqual('Test Message')
        wrapper.setProps({ variant: 'error', message: 'Test Error Message' })
        expect(wrapper.props().message).toEqual('Test Error Message')
        wrapper.setProps({ variant: 'warning', message: 'Test Warning Message' })
        expect(wrapper.props().message).toEqual('Test Warning Message')
    })
})