import React from 'react'
import { shallow } from 'enzyme'
import InputLabel from '../../../components/Common/InputLabel'

it('renders without crashing', () => {
    shallow(<InputLabel type="text" />)
})