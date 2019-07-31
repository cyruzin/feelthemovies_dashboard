import React from 'react'
import { shallow } from 'enzyme'
import Button from '../../../components/Common/Button'

it('renders without crashing', () => {
    shallow(<Button />)
})