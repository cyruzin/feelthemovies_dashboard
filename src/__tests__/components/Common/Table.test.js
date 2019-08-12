import React from 'react'
import { shallow } from 'enzyme'
import Table from '../../../components/Common/Table'

it('renders without crashing', () => {
    shallow(<Table columns={[
        { key: 1, name: '#' },
        { key: 2, name: 'Title' },
        { key: 3, name: 'Type' },
        { key: 4, name: 'Status' },
        { key: 5, name: 'Created at' },
        { key: 6, name: 'Updated at' },
        { key: 7, name: 'Actions' }
    ]} />)
})