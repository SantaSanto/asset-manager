import { useContext } from 'react'

import { ASSET_CATEGORY, INSTRUMENT } from '../../config/Constant'
import { HOLDER, INSTITUTION, FUND_HOUSE } from '../../config/Constant'
import { STATUS, ASSET_GROUP } from '../../config/Constant'

import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import TextField from '../form/TextField'
import DateField from '../form/DateField'
import SelectField from '../form/SelectField'
import MultiSelect from '../form/MultiSelect'

import { FormContext } from "../form/FormProvider"

export function AssetForm(props) {
    const { formState } = useContext(FormContext)
    const { formData } = formState

    const handleSubmit = () => {
        console.log(formData)
        save(formData)
    }

    return (
        <Form noValidate style={{ padding: '10px 25px' }}>
            <Form.Row>
                <TextField label='ASSET CODE' name='code' xs={4} />
                <TextField label='ASSET NAME' name='name' />
            </Form.Row>

            <Form.Row>
                <SelectField label='CATEGORY' name='category' options={ASSET_CATEGORY} />
                <SelectField label='INSTRUMENT' name='instrument' options={INSTRUMENT} />
            </Form.Row>

            <Form.Row>
                <SelectField label='HOLDER' name='holder' options={HOLDER} />
                <SelectField label='INSTITUTION' name='institution' options={INSTITUTION} />
                <SelectField label='FUND HOUSE' name='fundHouse' options={FUND_HOUSE} />
            </Form.Row>

            <Form.Row>
                <DateField label='START DATE' name='startDate' />
                <DateField label='END DATE' name='endDate' />
                <SelectField label='STATUS' name='status' options={STATUS} xs={3} />
            </Form.Row>

            <Form.Row>
                <MultiSelect label='ASSET GROUP' name='group' options={ASSET_GROUP} />
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col}>
                    <Button variant="primary" size='sm' onClick={handleSubmit}>SAVE</Button>
                </Form.Group>
            </Form.Row>
        </Form>
    )
}

function save(asset) {
    const payload = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(asset)
    }

    const result = fetch('/api/asset', payload)
        .then(response => response.json)
        .catch(error => console.log(error))

    console.log(result)
} 