import React from 'react'
import { shallow } from 'enzyme'
import Select from '../../../components/Common/Select'
import Option from '../../../components/Common/Option'

it('renders without crashing', () => {
    shallow(
        <Select>
            <Option value="test">Test</Option>
        </Select>
    )
})