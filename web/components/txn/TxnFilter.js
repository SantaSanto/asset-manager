import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SelectField from '../form/SelectField'

export default function TxnFilter({assetId}) {
    return (
        <Form style={{ padding: '0px 10px' }}>
            <Form.Row>
                <SelectField label='YEAR' name='YEAR' options={YEAR} />
                <SelectField label='MONTH' name='MONTH' options={MONTH} />
                <SelectField label='CATEGORY' name='CATEGORY' options={CATEGORY} />
                <SelectField label='TIMELINE' name='TIMELINE' options={TIMELINE} />                
                <SelectField label='STATUS' name='STATUS' options={STATUS} />
                <Button className='btn-add-txn' variant="primary"
                    href={`/txn-form?mode=NEW&assetId=${assetId}`}>ADD TRANSACTION</Button>
            </Form.Row>
        </Form>
    )
}

const YEAR = [
    { value:'ALL', label:'ALL' },
    { value:'2016', label:'FY 2016' },
    { value:'2017', label:'FY 2017' },
    { value:'2018', label:'FY 2018' },
    { value:'2019', label:'FY 2019' },
    { value:'2020', label:'FY 2020' },
] 

const MONTH = [
    { value:'ALL', label:'ALL' },
    { value:'01', label:'JANUARY' },
    { value:'02', label:'FEBRUARY' },
    { value:'03', label:'MARCH' },
    { value:'04', label:'APRIL' },
    { value:'05', label:'MAY' },
] 

const CATEGORY = [
    { value: 'ALL', label: 'ALL' },
    { value: 'DEPOSIT', label: 'DEPOSIT' },
    { value: 'CREDIT', label: 'CREDIT' },
    { value: 'WITHDRAW', label: 'WITHDRAW' },
    { value: 'NAV', label: 'NAV' }
]

const TIMELINE = [
    { value: 'ALL', label: 'ALL'       },
    { value: 'C',   label: 'COMPLETED' },
    { value: 'E',   label: 'EXPECTED'  }
    
]

const STATUS = [
    { value: 'C', label: 'CLEARED' },
    { value: 'V', label: 'VOID'    },
    { value: 'D', label: 'DELETED' },
]