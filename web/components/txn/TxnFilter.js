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
    { value:'ALL',  label:'ALL'  },
    { value:'2021', label:'2021' },    
    { value:'2020', label:'2020' },
    { value:'2019', label:'2019' },
    { value:'2018', label:'2018' },
    { value:'2017', label:'2017' },
    { value:'2016', label:'2016' }    
] 

const MONTH = [
    { value:'ALL', label:'ALL' },
    { value:'01', label:'JANUARY' },
    { value:'02', label:'FEBRUARY' },
    { value:'03', label:'MARCH' },
    { value:'04', label:'APRIL' },
    { value:'05', label:'MAY' },
    { value:'06', label:'JUNE' },
    { value:'07', label:'JULY' },
    { value:'08', label:'AUGUST' },
    { value:'09', label:'SEPTEMBER' },
    { value:'10', label:'OCTOBER' },
    { value:'11', label:'NOVEMBER' },
    { value:'12', label:'DECEMBER' },
] 

const CATEGORY = [
    { value: 'ALL', label: 'ALL' },
    { value: 'DEPOSIT',  label: 'DEPOSIT' },
    { value: 'CREDIT',   label: 'CREDIT' },
    { value: 'MATURITY', label: 'MATURITY' },
    { value: 'WITHDRAW', label: 'WITHDRAW' },
    { value: 'NAV',      label: 'NAV' }
]

const TIMELINE = [
    { value: 'ALL', label: 'ALL'       },
    { value: 'C',   label: 'COMPLETED' },
    { value: 'E',   label: 'EXPECTED'  }
    
]

const STATUS = [
    { value: 'C', label: 'CLEARED' },
    { value: 'V', label: 'VOID'    },
    { value: 'A', label: 'ARCHIVED' },
    { value: 'D', label: 'DELETED' },
]