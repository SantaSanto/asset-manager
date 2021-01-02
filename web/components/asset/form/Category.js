import Form from 'react-bootstrap/Form'

export default function Category(props) {
    return (
        <Form.Group controlId='asset_category' {...props} >
            <Form.Label>CATEGORY</Form.Label>
            <Form.Control as='select' custom>
                <option></option>
                <option>EQUITY</option>
                <option>DEBT</option>
                <option>FIXED</option>
                <option>BULLION</option>
            </Form.Control>
        </Form.Group>
    )
}