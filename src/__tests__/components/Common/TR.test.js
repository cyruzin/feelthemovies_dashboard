import React from 'react'
import { shallow } from 'enzyme'
import TR from '../../../components/Common/TR'

it('renders without crashing', () => {
    shallow(<TR />)
})