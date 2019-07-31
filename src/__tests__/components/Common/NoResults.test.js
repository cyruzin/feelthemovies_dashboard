import React from 'react'
import { shallow } from 'enzyme'
import NoResults from '../../../components/Common/NoResults'

it('renders without crashing', () => {
    shallow(<NoResults />)
})