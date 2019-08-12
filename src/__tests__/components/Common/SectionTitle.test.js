import React from 'react'
import { shallow } from 'enzyme'
import SectionTitle from '../../../components/Common/SectionTitle'

it('renders without crashing', () => {
    shallow(<SectionTitle title="Test" />)
})