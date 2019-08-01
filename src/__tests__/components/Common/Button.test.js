import React from 'react'
import sinon from 'sinon'
import { shallow, mount } from 'enzyme'
import Button from '../../../components/Common/Button'

it('renders without crashing', () => {
    shallow(<Button>Test</Button>)
})

describe('<Button />', () => {
    it('simulates click events', () => {
        const onClick = sinon.spy()
        const wrapper = mount((
            <Button onClick={onClick} />
        ))
        wrapper.find('button').simulate('click')
        sinon.assert.called(onClick)
    })
})