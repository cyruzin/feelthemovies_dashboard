import React from 'react'
import {
    Section, SectionTitle, BreadCrumbs, FormGroup,
    Input, TextArea, Select, Option
} from '../Common'

function RecommendationsCreate () {
    return (
        <>
            <BreadCrumbs
                activeName="Create"
                breadCrumbs={[{
                    key: 1,
                    path: '/dashboard/recommendations',
                    name: 'Recommendations'
                }]} />
            <Section>
                <SectionTitle title="Create Recommendation" />

                <FormGroup label="Title">
                    <Input className="form-control" />
                </FormGroup>

                <FormGroup label="Body">
                    <TextArea className="form-control" />
                </FormGroup>

                <FormGroup label="Type">
                    <Select className="form-control mb-3" >
                        <Option value="0" defaultValue>Movie</Option>
                        <Option value="1">TV Show</Option>
                        <Option value="2">Mixed</Option>
                    </Select>
                </FormGroup>

            </Section>
        </>
    )
}

export default RecommendationsCreate