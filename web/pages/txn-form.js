import { getTxn } from '../dao/txn-dao'
import { FormProvider } from '../components/form/FormProvider'
import { TxnForm } from '../components/txn/TxnForm'


export default function AddTransaction(props) {
    return (
        <FormProvider model={props.txn}>
            <TxnForm mode={props.formMode} />
        </FormProvider>
    )
}


export async function getServerSideProps(context) {
    const query = context.query

    const _breadcrumb = { key: 'TXN_FORM', title: '', href: "#", active: true }

    let _txn = {}

    if (query.mode === 'NEW') {
        _breadcrumb.title = 'ADD TRANSACTION'
        _txn = createTxn(query.assetId)
    }

    if (query.mode === 'EDIT') {
        _breadcrumb.title = 'EDIT TRANSACTION'

        _txn = await getTxn(query.txnId)
        _txn = JSON.parse(JSON.stringify(_txn[0]))    
        console.log(_txn)
    } 

    return {
        props: {
            breadcrumb: _breadcrumb,
            txn: _txn,
            formMode: query.mode
        },
    }
}

function createTxn(assetId) {
    return {
        ASSET_ID: assetId,
        DATE: '', 
        CATEGORY: '', 
        TIMELINE: '', 
        STATUS: 'C', 
        UNIT: "1", 
        VALUE:'0', 
        AMOUNT:'0', 
        COMMENTS: ''
    }    
}