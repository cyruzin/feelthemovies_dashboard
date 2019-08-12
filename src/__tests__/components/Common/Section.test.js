import React from 'react'
import { shallow } from 'enzyme'
import Section from '../../../components/Common/Section'

it('renders without crashing', () => {
    shallow(<Section />)
})