import Form from 'react-bootstrap/Form'
import SelectField from '../form/SelectField'

export default function Filter(props) {
    return (
        <Form style={{ padding: '0px 10px' }}>
            <Form.Row>
                <SelectField label='PORTFOLIO' name='PORTFOLIO' options={PORTFOLIO} />
                <SelectField label='HOLDER' name='HOLDER' options={HOLDER} />
                <SelectField label='INSTITUTION' name='INSTITUTION' options={INSTITUTION} />
                <SelectField label='CATEGORY' name='CATEGORY' options={CATEGORY} />
                <SelectField label='YEAR' name='YEAR' options={YEAR} />
            </Form.Row>
        </Form>
    )
}

export const PORTFOLIO = [
    { value:'ALL', label:'ALL' },
    { value:'EXIGENCY', label:'EXIGENCY' },
    { value:'EDUCATION', label:'EDUCATION' },
    { value:'CHILDREN', label:'CHILDREN' },
    { value:'WELFARE', label:'WELFARE' },
    { value:'RETIRMENT', label:'RETIRMENT' },
    { value:'RELIANT', label:'RELIANT' }
]

export const HOLDER = [
    { value:'ALL', label:'ALL' },
    { value:'LAVANYA', label:'LAVANYA' },
    { value:'PRANAYA', label:'PRANAYA' },
    { value:'SANTOSH', label:'SANTOSH' }
]

export const INSTITUTION = [
    { value:'ALL', label:'ALL' },
    { value:'CITIBANK', label:'CITIBANK' },
    { value:'DIGIBANK', label:'DIGIBANK' },
    { value:'SBI', label:'SBI' },
    { value:'HDFC', label:'HDFC' },   
    { value:'EPFO', label:'EPFO' },
    { value:'PO', label:'PO' },
    { value:'KUVERA', label:'KUVERA' },
    { value:'ZERODHA', label:'ZERODHA' },
    { value:'BAJAJ', label:'BAJAJ' },
    { value:'TNPF', label:'TNPF' }
]

const CATEGORY = [
    { value: 'CREDIT',   label: 'CREDIT' },
    { value: 'MATURITY', label: 'MATURITY' }
]

const YEAR = [
    { value:'2021', label:'2021' },    
    { value:'2022', label:'2022' }
] 
