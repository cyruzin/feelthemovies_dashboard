import React from 'react'
import { shallow } from 'enzyme'
import Modal from '../../../components/Common/Modal'

it('renders without crashing', () => {
    shallow(<Modal />)
})