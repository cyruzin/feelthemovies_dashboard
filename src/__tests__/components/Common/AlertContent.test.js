import React from 'react'
import { shallow, mount } from 'enzyme'
import AlertContent from '../../../components/Common/AlertContent'

it('renders without crashing', () => {
    shallow(<AlertContent variant="success" message="Test Message" />)
})


describe('<AlertContent />', () => {
    it('allows us to set props', () => {
        const wrapper = mount(<AlertContent variant="success" message="Test Message" />)
        expect(wrapper.props().variant).toEqual('success')
        expect(wrapper.props().message).toEqual('Test Message')
        wrapper.setProps({ variant: 'error', message: 'Test Error Message' })
        expect(wrapper.props().variant).toEqual('error')
        expect(wrapper.props().message).toEqual('Test Error Message')
        wrapper.setProps({ variant: 'warning', message: 'Test Warning Message' })
        expect(wrapper.props().variant).toEqual('warning')
        expect(wrapper.props().message).toEqual('Test Warning Message')
    })
})