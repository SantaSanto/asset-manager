import { useContext } from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import { FormContext } from "./FormProvider"

export default function TextField(props) {
    const { formState, dispatch } = useContext(FormContext)
    const { formData } = formState

    const fieldName = props.name
    const onChange = props.onChange
    const fieldValue = formData[fieldName]

    const handleChange = (event) => {
        const fieldValue = event.target.value
        formData[fieldName] = fieldValue

        if(onChange !== undefined) onChange(formData)
        
        dispatch({ type:'FIELD_CHANGED', payload: formData })
    }

    return (
        <Form.Group controlId={`FC_${fieldName}`} as={Col} xs={props.xs} >
            <Form.Label>{props.label}</Form.Label>
            <Form.Control type="number" required readOnly={props.readOnly}
                value={fieldValue}
                onChange={ handleChange } />
        </Form.Group>
    )
}