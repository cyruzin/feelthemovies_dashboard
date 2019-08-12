import React from 'react'
import { shallow } from 'enzyme'

import BreadCrumbs from '../../../components/Common/BreadCrumbs'

it('renders without crashing', () => {
    shallow(<BreadCrumbs breadCrumbs={[{
        key: 1,
        path: '/dashboard/recommendations',
        name: 'Recommendations'
    }]} />)
})