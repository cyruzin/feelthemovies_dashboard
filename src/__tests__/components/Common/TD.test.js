import React from 'react'
import { shallow } from 'enzyme'
import TD from '../../../components/Common/TD'

it('renders without crashing', () => {
    shallow(<TD />)
})