import React, { useState, useContext } from 'react'

import { ASSET_CATEGORY, INSTRUMENT } from '../../config/Constant'
import { HOLDER } from '../../config/Constant'
import { STATUS, PORTFOLIO } from '../../config/Constant'

import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import TextField from '../form/TextField'
import DateField from '../form/DateField'
import SelectField from '../form/SelectField'
import MultiSelect from '../form/MultiSelect'

import { FormContext } from "../form/FormProvider"

export function TxnForm(props) {
    const [alert, setAlert] = useState({ show: false })
    const { formState } = useContext(FormContext)
    const { formData } = formState

    let buttonLabel = 'SAVE'
    if (props.mode === 'EDIT') {
        buttonLabel = 'UPDATE'
    }

    const handleSubmit = () => {
        let method = 'POST'
        if (props.mode === 'EDIT') {
            method = 'PUT'
        }

        const result = fetch('/api/asset', header(method, formData))
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
            <FormAlert alert={alert} />
            <Form noValidate style={{ padding: '10px 25px' }}>
                <Form.Row>
                    <DateField label='TRANSACTION DATE' name='DATE' xs={3} />
                    <SelectField label='CATEGORY' name='CATEGORY' options={CATEGORY} />
                    <SelectField label='STATUS' name='STATUS' options={STATUS} xs={3} />
                </Form.Row>

                <Form.Row>
                    <TextField label='UNIT' name='UNIT' />
                    <TextField label='VALUE' name='VALUE' />
                    <TextField label='AMOUNT' name='AMOUNT' readonly='true' />
                </Form.Row>

                <Form.Row>
                    <TextField label='DESCRIPTION' name='DESC' />
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col}>
                        <Button variant="primary" size='sm' onClick={handleSubmit}>{buttonLabel}</Button>
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
    if (!error) {
        return (
            <Alert variant="success">
                Asset has been saved successfully.
            </Alert>
        )
    }
}

function header(method, asset) {
    return {
        method: method,
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

const CATEGORY = [
    { value: '', label: '' },
    { value: 'DEPOSIT', label: 'DEPOSIT' },
    { value: 'CREDIT', label: 'CREDIT' },
    { value: 'WITHDRAW', label: 'WITHDRAW' },
    { value: 'NAV', label: 'NAV' }
]