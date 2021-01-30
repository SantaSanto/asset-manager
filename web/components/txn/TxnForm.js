import React, { useState, useContext } from 'react'

import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import NumField from '../form/NumField'
import TextField from '../form/TextField'
import DateField from '../form/DateField'
import SelectField from '../form/SelectField'

import { FormContext } from "../form/FormProvider"

export function TxnForm(props) {
    const [alert, setAlert] = useState({ show: false })
    const { formState } = useContext(FormContext)
    const { formData } = formState

    const buttonLabel = (props.mode === 'EDIT')? 'UPDATE' : 'SAVE'
    
    const updateAmount = (formData) => {
        const unit = formData['UNIT']
        const value = formData['VALUE']
        let result = parseInt(unit) * parseInt(value)

        result = (isNaN(result))? '0' : result 
        formData['AMOUNT'] = String(result)
    }

    const handleSubmit = () => {
        const method = (props.mode === 'EDIT')? 'PUT' : 'POST'
        
        fetch('/api/txn', header(method, formData))
            .then(handleErrors)
            .then(res => {
                setAlert({ ...alert, show: true, error: false })
            })
            .catch(err => {
                setAlert({ ...alert, show: true, error: true })
            }
        )
    }


    return (
        <React.Fragment>
            <FormAlert alert={alert} />
            <Form noValidate style={{ padding: '10px 25px' }}>
                {/* <input type='hidden' name='ASSET_ID' value={formData['ASSET_ID']} /> */}
                <Form.Row>
                    <DateField label='TRANSACTION DATE' name='DATE' />
                    <SelectField label='CATEGORY' name='CATEGORY' options={CATEGORY} />
                    <SelectField label='TIMELINE' name='TIMELINE' options={TIMELINE} />
                    <SelectField label='STATUS' name='STATUS' options={STATUS} />
                </Form.Row>

                <Form.Row>
                    <NumField label='UNIT' name='UNIT' onChange={updateAmount} />
                    <NumField label='VALUE' name='VALUE' onChange={updateAmount} />
                    <NumField label='AMOUNT' name='AMOUNT' readOnly={true} />
                </Form.Row>

                <Form.Row>
                    <TextField label='DESCRIPTION' name='COMMENTS' />
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
                Error while saving Transaction.
            </Alert>
        )
    }
    if (!error) {
        return (
            <Alert variant="success">
                Transaction has been saved successfully.
            </Alert>
        )
    }
}

function header(method, txn) {
    return {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(txn)
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
    { value: 'DEPOSIT',  label: 'DEPOSIT' },
    { value: 'CREDIT',   label: 'CREDIT' },
    { value: 'WITHDRAW', label: 'WITHDRAW' },
    { value: 'NAV',      label: 'NAV' }
]

const TIMELINE = [
    { value: '',  label: ''          },
    { value: 'C', label: 'COMPLETED' },
    { value: 'E', label: 'EXPECTED'  }
    
]

const STATUS = [
    { value: 'C', label: 'CLEARED' },
    { value: 'V', label: 'VOID'    },
    { value: 'D', label: 'DELETED' },
]