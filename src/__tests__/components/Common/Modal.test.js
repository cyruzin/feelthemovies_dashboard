import React from 'react'
import sinon from 'sinon'
import { shallow, mount } from 'enzyme'

import Modal from '../../../components/Common/Modal'
import Input from '../../../components/Common/Input'

it('renders without crashing', () => {
    shallow(<Modal title="Test Title" />)
})

describe('<Modal />', () => {
    it('allows us to set props', () => {
        const wrapper = mount(<Modal title="Delete Recommendation" />)
        expect(wrapper.props().title).toEqual('Delete Recommendation')
        wrapper.setProps({ show: true })
        expect(wrapper.props().show).toBe(true)
        wrapper.setProps({ showCloseBtn: false })
        expect(wrapper.props().showCloseBtn).toBe(false)
        wrapper.setProps({ closeBtnName: 'Close Button' })
        expect(wrapper.props().closeBtnName).toEqual('Close Button')
        wrapper.setProps({ okBtnName: 'Open Button' })
        expect(wrapper.props().okBtnName).toEqual('Open Button')
    })

    it('renders children components', () => {
        const wrapper = mount(
            <Modal title="Delete Recommendation" >
                <Input type="text" />
            </Modal>
        )
        expect(wrapper.find('Input').length).toEqual(1)
    })

    it('simulates click events', () => {
        const onClick = sinon.spy()
        const wrapperOnClick = mount((<Modal onClick={onClick} />))
        wrapperOnClick.find('Button').first().simulate('click')
        sinon.assert.called(onClick)

        const onClose = sinon.spy()
        const wrapperOnClose = mount((<Modal onClose={onClose} />))
        wrapperOnClose.find('Button').last().simulate('click')
        sinon.assert.called(onClose)
    })
})