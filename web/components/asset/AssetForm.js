import React, { useState, useContext } from 'react'

import { ASSET_CATEGORY, INSTRUMENT } from '../../config/Constant'
import { HOLDER, INSTITUTION, FUND_HOUSE } from '../../config/Constant'
import { STATUS, ASSET_GROUP } from '../../config/Constant'

import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import TextField from '../form/TextField'
import DateField from '../form/DateField'
import SelectField from '../form/SelectField'
import MultiSelect from '../form/MultiSelect'

import { FormContext } from "../form/FormProvider"

export function AssetForm(props) {
    const [alert, setAlert] = useState({ show: false })
    const { formState } = useContext(FormContext)
    const { formData } = formState

    const handleSubmit = () => {
        const result = fetch('/api/asset', payload(formData))
            .then(handleErrors)
            .then(res => {
                setAlert({ ...alert, show: true, error: false })
            })
            .catch(error => {
                setAlert({ ...alert, show: true, error: true })
            })
    }

    return (
        <React.Fragment>
            <FormAlert alert={alert}/>
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
        </React.Fragment>
    )
}

function FormAlert(props) {
    const { show, error } = props.alert
    if (!show) return null
    if (error) {
        return (
            <Alert variant="danger">
                Error while saving Asset.
            </Alert>
        )
    } 
    if(!error) {
        return (
            <Alert variant="success">
                Asset has been saved successfully.
            </Alert>
        )
    }
}

function payload(asset) {
    return {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(asset)
    }
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}