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
    }

    return (
        <Form noValidate>
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
                <SelectField label='FUND HOUSE' name='funds' options={FUND_HOUSE} />
            </Form.Row>

            <Form.Row>
                <DateField label='START DATE' name='sdate' />
                <DateField label='END DATE' name='edate' />
                <SelectField label='STATUS' name='status' options={STATUS} xs={3} />
            </Form.Row>

            <Form.Row>
                <MultiSelect label='ASSET GROUP' name='group' options={ASSET_GROUP} />
            </Form.Row>

            {/* <Form.Row>
                <Form.Group as={Col} xs={12} controlId="asset_group">
                    <Form.Label>ASSET GROUP</Form.Label>
                    <div className='row asset-group'>
                        <Form.Check className='col-2' type="checkbox" label="EXIGENCY" checked/>
                        <Form.Check className='col-2' type="checkbox" label="EDUCATION" />
                        <Form.Check className='col-2' type="checkbox" label="CHILDREN" />
                        <Form.Check className='col-2' type="checkbox" label="WELFARE" />
                        <Form.Check className='col-2' type="checkbox" label="RETIRMENT" checked />
                        <Form.Check className='col-2' type="checkbox" label="RELIANT" />
                    </div>
                </Form.Group>
            </Form.Row> */}

            <Form.Group as={Col}>
                <Button variant="primary" size='sm' onClick={handleSubmit}>SAVE</Button>
            </Form.Group>
        </Form>
    )
}