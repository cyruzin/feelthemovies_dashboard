import React from 'react'
import { shallow } from 'enzyme'

import FormGroup from '../../../components/Common/FormGroup'
import Input from '../../../components/Common/Input'

it('renders without crashing', () => {
    shallow(
        <FormGroup label="Title">
            <Input type="text" />
        </FormGroup>
    )
})