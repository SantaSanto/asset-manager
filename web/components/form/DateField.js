import { useContext } from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import { FormContext } from "./FormProvider"

export default function DateField(props) {
    const { formState, dispatch } = useContext(FormContext)
    const { formData } = formState

    const fieldName = props.name
    const fieldValue = formData[fieldName]

    const handleChange = (event) => {
        const fieldValue = event.target.value
        formData[fieldName] = fieldValue
        dispatch({ type:'FIELD_CHANGED', payload: formData })
    }

    return (
        <Form.Group controlId={`FC_${fieldName}`} as={Col} {...props}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control type="date" required 
                value={fieldValue}
                onChange={ handleChange } />
        </Form.Group>
    )
}