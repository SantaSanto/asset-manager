import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SelectField from '../form/SelectField'

export default function TxnFilter(props) {
    return (
        <Form style={{ padding: '0px 10px' }}>
            <Form.Row>
                <SelectField label='YEAR' name='year' options={YEAR} />
                <SelectField label='MONTH' name='month' options={MONTH} />
                <SelectField label='HOLDER' name='holder' options={HOLDER} />
                <SelectField label='INSTITUTION' name='institution' options={INSTITUTION} />
                <SelectField label='STATUS' name='status' options={STATUS} />
                <Button className='btn-add-txn' variant="primary">ADD TRANSACTION</Button>
            </Form.Row>
        </Form>
    )
}

export const YEAR = [
    { value:'ALL', label:'ALL' },
    { value:'2016', label:'FY 2016' },
    { value:'2017', label:'FY 2017' },
    { value:'2018', label:'FY 2018' },
    { value:'2019', label:'FY 2019' },
    { value:'2020', label:'FY 2020' },
] 

export const MONTH = [
    { value:'ALL', label:'ALL' },
    { value:'01', label:'JANUARY' },
    { value:'02', label:'FEBRUARY' },
    { value:'03', label:'MARCH' },
    { value:'04', label:'APRIL' },
    { value:'05', label:'MAY' },
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