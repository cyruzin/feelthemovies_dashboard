import React from 'react'
import { shallow } from 'enzyme'
import Input from '../../../components/Common/Input'

it('renders without crashing', () => {
    shallow(<Input />)
})