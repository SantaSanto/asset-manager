import { FormProvider } from '../components/form/FormProvider'
import { TxnForm } from '../components/txn/TxnForm'


export default function AddTransaction(props) {
    return (
        <FormProvider model={props.txn}>
            <TxnForm mode='ADD' />
        </FormProvider>
    )
}


export async function getServerSideProps(context) {
    const query = context.query

    const _breadcrumb = { key: 'TXN_FORM', title: 'ADD TRANSACTION', href: "#", active: true }

    let _txn = {}

    if (query.mode === 'NEW') {
        _txn = createTxn(query.assetId)
    }

    return {
        props: {
            breadcrumb: _breadcrumb,
            txn: _txn
        },
    }
}

function createTxn(assetId) {
    return {
        ASSET_ID: assetId,
        DATE: '', 
        CATEGORY: '', 
        TIMELINE: '', 
        STATUS: 'A', 
        UNIT: "1", 
        VALUE:'0', 
        AMOUNT:'0', 
        COMMENTS: ''
    }    
}