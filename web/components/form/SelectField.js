import { useContext } from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import { FormContext } from "./FormProvider"

export default function SelectField(props) {
    const { formState, dispatch } = useContext(FormContext)
    const { formData } = formState

    const fieldName = props.name
    const fieldValue = formData[fieldName]

    const handleChange = (event) => {
        const _fieldValue = event.target.value
        formData[fieldName] = _fieldValue
        dispatch({ type: 'FIELD_CHANGED', payload: formData })
    }

    return (
        <Form.Group controlId={`FC_${fieldName}`} as={Col} {...props} >
            <Form.Label>{props.label}</Form.Label>
            <Form.Control as='select' required custom value={fieldValue} onChange={handleChange}> {
                props.options.map(option =>
                    <SelectOption key={option.value} {...option} />
                )}
            </Form.Control>
        </Form.Group>
    )
}

// function FormControl(props) {
//     reutrn (
//         <Form.Control custom as='select'          
//             value={fieldValue} 
//             onChange={handleChange} > 
            
//             { options.map( option =>
//                 <SelectOption 
//                     key={option.value} 
//                     {...option} />
//             )}
//         </Form.Control> 
//     )
// }

function SelectOption({ value, label }) {
    return (
        <option value={value}>{label}</option>
    )
} 