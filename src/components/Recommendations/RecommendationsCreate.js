import React from 'react'
import AntSelect from 'antd/lib/select'
import AntSpin from 'antd/lib/spin'
import 'antd/lib/select/style/css'
import 'antd/lib/spin/style/css'
import {
    Section, SectionTitle, BreadCrumbs, FormGroup,
    Input, TextArea, Select, Option, Button
} from '../Common'

const AntOption = AntSelect.Option

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

                <FormGroup label="Image">
                    <AntSelect
                        showSearch
                        size='large'
                        value={''}
                        style={{ width: '100%' }}
                        defaultActiveFirstOption={false}
                        notFoundContent={
                            true ? <AntSpin size="small" /> : null
                        }
                        showArrow={false}
                        filterOption={false}
                    // onSearch={this.fetchRecommendationImages}
                    //onChange={this.handleRecommendationImage}
                    >
                        <AntOption key={1} value="test">
                            Test
                        </AntOption>
                    </AntSelect>
                </FormGroup>

                <FormGroup label="Genres">
                    <AntSelect
                        mode="multiple"
                        labelInValue
                        size='large'
                        //value={''}
                        style={{ width: '100%' }}
                        notFoundContent={
                            true ? <AntSpin size="small" /> : null
                        }
                        showArrow={false}
                        filterOption={false}
                    // onSearch={this.fetchRecommendationImages}
                    //onChange={this.handleRecommendationImage}
                    >
                        <AntOption key={1} value="test">
                            Test
                        </AntOption>
                    </AntSelect>
                </FormGroup>

                <FormGroup label="Keywords">
                    <AntSelect
                        mode="multiple"
                        labelInValue
                        size='large'
                        // value={''}
                        style={{ width: '100%' }}
                        notFoundContent={
                            true ? <AntSpin size="small" /> : null
                        }
                        showArrow={false}
                        filterOption={false}
                    // onSearch={this.fetchRecommendationImages}
                    //onChange={this.handleRecommendationImage}
                    >
                        <AntOption key={1} value="test">
                            Test
                        </AntOption>
                    </AntSelect>
                </FormGroup>

                <FormGroup>
                    <Button>Create</Button>
                </FormGroup>

            </Section>
        </>
    )
}

export default RecommendationsCreate