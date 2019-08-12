import React from 'react'
import { shallow } from 'enzyme'
import Option from '../../../components/Common/Option'

it('renders without crashing', () => {
    shallow(<Option value="test">Test</Option>)
})