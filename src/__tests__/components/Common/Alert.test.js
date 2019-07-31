import React from 'react'
import { shallow } from 'enzyme'
import Alert from '../../../components/Common/Alert'

it('renders without crashing', () => {
    shallow(<Alert variant="success" message="Test Message" />)
})