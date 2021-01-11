import Form from 'react-bootstrap/Form'
import SelectField from '../form/SelectField'

export default function AssetFilter(props) {
    return (
        <Form style={{ padding: '0px 10px' }}>
            <Form.Row>
                <SelectField label='PORTFOLIO' name='portfolio' options={PORTFOLIO} />
                <SelectField label='CATEGORY' name='category' options={CATEGORY} />
                <SelectField label='INSTRUMENT' name='instrument' options={INSTRUMENT} />
                <SelectField label='HOLDER' name='holder' options={HOLDER} />
                <SelectField label='INSTITUTION' name='institution' options={INSTITUTION} />
                <SelectField label='STATUS' name='status' options={STATUS} />
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

export const CATEGORY = [
    { value:'ALL', label:'ALL' },
    { value:'EQUITY', label:'EQUITY' },
    { value:'DEBT', label:'DEBT' },
    { value:'FIXED', label:'FIXED' },
    { value:'BULLION', label:'BULLION' }
] 

export const INSTRUMENT = [
    { value:'ALL', label:'ALL' },
    { value:'BOND', label:'BOND' },
    { value:'FUND', label:'FUND' },
    { value:'NPS', label:'NPS' },
    { value:'DEPOSIT', label:'DEPOSIT' },
    { value:'EPF', label:'EPF' },
    { value:'PPF', label:'PPF' },
    { value:'SSA', label:'SSA' }
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
    { value:'HDFC', label:'HDFC' }    
]

export const STATUS = [
    { value:'A', label:'ACTIVE' },
    { value:'C', label:'CLOSED' },
    { value:'D', label:'DELETED' },
]