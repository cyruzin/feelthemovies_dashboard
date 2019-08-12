import React from 'react'
import { shallow } from 'enzyme'
import Spinner from '../../../components/Common/Spinner'

it('renders without crashing', () => {
    shallow(<Spinner />)
})