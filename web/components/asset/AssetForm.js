import React, { useState, useContext } from 'react'
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

    const buttonLabel = (props.mode === 'EDIT')? 'UPDATE' : 'SAVE'

    const handleSubmit = () => {
        const method = (props.mode === 'EDIT')? 'PUT' : 'POST'

        fetch('/api/asset', header(method, formData))
            .then(handleErrors)
            .then(res => {
                setAlert({ ...alert, show: true, error: false })
            })
            .catch(err => {
                setAlert({ ...alert, show: true, error: true })
            })
    }

    return (
        <React.Fragment>
            <FormAlert alert={alert}/>
            <Form noValidate style={{ padding: '10px 25px' }}>

                <Form.Row>
                    <TextField label='ASSET NAME' name='NAME' xs={5} />
                    <SelectField label='CATEGORY' name='CATEGORY' options={ASSET_CATEGORY} />
                    <SelectField label='INSTRUMENT' name='INSTRUMENT' options={INSTRUMENT} />
                </Form.Row>

                <Form.Row>
                    <SelectField label='HOLDER' name='HOLDER' options={HOLDER} />
                    <SelectField label='INSTITUTION' name='INSTITUTION' options={INSTITUTION} />
                    <SelectField label='FUND HOUSE' name='FUND_HOUSE' options={FUND_HOUSE} />
                </Form.Row>

                <Form.Row>
                    <DateField label='START DATE' name='START_DATE' />
                    <DateField label='END DATE' name='END_DATE' />
                    <SelectField label='STATUS' name='STATUS' options={STATUS} xs={3} />
                </Form.Row>

                <Form.Row>
                    <MultiSelect label='PORTFOLIO' name='PORTFOLIO' options={PORTFOLIO} />
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
    if(!error) {
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

const ASSET_CATEGORY = [
    { value:'', label:'' },
    { value:'EQUITY', label:'EQUITY' },
    { value:'DEBT', label:'DEBT' },
    { value:'FIXED', label:'FIXED' },
    { value:'BULLION', label:'BULLION' }
]

const INSTRUMENT = [
    { value:'', label:'' },
    { value:'BOND', label:'BOND' },
    { value:'FUND', label:'FUND' },
    { value:'NPS', label:'NPS' },
    { value:'DEPOSIT', label:'DEPOSIT' },
    { value:'EPF', label:'EPF' },
    { value:'PPF', label:'PPF' },
    { value:'SSA', label:'SSA' }
]

const HOLDER = [
    { value:'', label:'' },
    { value:'LAVANYA', label:'LAVANYA' },
    { value:'PRANAYA', label:'PRANAYA' },
    { value:'SANTOSH', label:'SANTOSH' }
]

const INSTITUTION = [
    { value:'', label:'' },
    { value:'CITIBANK', label:'CITIBANK' },
    { value:'DIGIBANK', label:'DIGIBANK' },
    { value:'SBI', label:'SBI' },
    { value:'HDFC', label:'HDFC' },   
    { value:'EPFO', label:'EPFO' },
    { value:'PO', label:'PO' },
    { value:'BAJAJ', label:'BAJAJ' },
    { value:'TNPF', label:'TNPF' }
]

const FUND_HOUSE = [
    { value:'', label:'' },
    { value:'NA', label:'NA' }, 
    { value:'CITIBANK', label:'CITIBANK' },
    { value:'DIGIBANK', label:'DIGIBANK' },
    { value:'SBI', label:'SBI' },
    { value:'HDFC', label:'HDFC' }, 
    { value:'PPF', label:'PPF' }, 
    { value:'SSA', label:'SSA' }, 
    { value:'EMPLOYEE', label:'EMPLOYEE' },
    { value:'COMPANY', label:'COMPANY' },
    { value:'TNPF', label:'TNPF' }    
]

const STATUS = [
    { value:'A', label:'ACTIVE' },
    { value:'C', label:'CLOSED' },
    { value:'D', label:'DELETED' },
]

const PORTFOLIO = [
    { value:'EXIGENCY', label:'EXIGENCY' },
    { value:'EDUCATION', label:'EDUCATION' },
    { value:'CHILDREN', label:'CHILDREN' },
    { value:'WELFARE', label:'WELFARE' },
    { value:'RETIRMENT', label:'RETIRMENT' },
    { value:'RELIANT', label:'RELIANT' }
]