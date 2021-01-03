import { useContext } from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import { FormContext } from "./FormProvider"

export default function MultiSelect(props) {
    const { formState, dispatch } = useContext(FormContext)
    const { formData } = formState

    const fieldName = props.name
    const fieldValue = formData[fieldName]

    const handleChange = (event) => {
        const _fieldValue = event.target.name
        const fieldState = event.target.checked

        if (fieldState) {
            if (formData[fieldName]) {
                formData[fieldName].push(_fieldValue)
            } else {
                formData[fieldName] = [_fieldValue]
            }
        } else {
            formData[fieldName] = formData[fieldName]
                .filter(item => item !== _fieldValue)
        }

        dispatch({ type: 'FIELD_CHANGED', payload: formData })
    }

    return (
        <Form.Group controlId={`FC_${fieldName}`} as={Col} {...props}>
            <Form.Label>{props.label}</Form.Label>
            <div className='row asset-group'> {
                props.options.map(option =>
                    <CheckBox key={option.value} selected={fieldValue} onChange={handleChange} {...option} />
                )}
            </div>
        </Form.Group>
    )
}

function CheckBox(props) {
    const checked = props.selected.includes(props.value)
    return (
        <Form.Check className='col-2' type="checkbox" name={props.value} label={props.label}
            checked={checked} onChange={props.onChange} />
    )
}