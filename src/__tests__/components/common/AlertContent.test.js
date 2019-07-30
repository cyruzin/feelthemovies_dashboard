import React from 'react'
import { shallow } from 'enzyme'
import AlertContent from '../../../components/Common/AlertContent'

it('renders without crashing', () => {
    shallow(<AlertContent />)
})