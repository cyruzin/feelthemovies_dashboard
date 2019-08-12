import React from 'react'
import { shallow, mount } from 'enzyme'

import Table from '../../../components/Common/Table'
import TR from '../../../components/Common/TR'
import TD from '../../../components/Common/TD'
import Button from '../../../components/Common/Button'

it('renders without crashing', () => {
    shallow(
        <Table columns={[
            { key: 1, name: '#' },
            { key: 2, name: 'Title' },
            { key: 3, name: 'Type' },
            { key: 4, name: 'Status' },
            { key: 5, name: 'Created at' },
            { key: 6, name: 'Updated at' },
            { key: 7, name: 'Actions' }
        ]}>
            <TR>
                <TD>
                    <Button>Test</Button>
                </TD>
            </TR>
        </Table>
    )
})

describe('<TR> </TR>', () => {
    it('renders children components', () => {
        const wrapper = mount(
            <Table columns={[
                { key: 1, name: '#' },
                { key: 2, name: 'Title' },
                { key: 3, name: 'Type' },
                { key: 4, name: 'Status' },
                { key: 5, name: 'Created at' },
                { key: 6, name: 'Updated at' },
                { key: 7, name: 'Actions' }
            ]}>
                <TR>
                    <TD>
                        <Button>Test</Button>
                    </TD>
                </TR>
            </Table>
        )
        expect(wrapper.find('TR').children().find('TD').length).toEqual(1)
    })
})