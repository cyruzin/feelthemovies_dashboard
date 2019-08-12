import React from 'react'
import { shallow } from 'enzyme'
import TextArea from '../../../components/Common/TextArea'

it('renders without crashing', () => {
    shallow(<TextArea rows={4} />)
})