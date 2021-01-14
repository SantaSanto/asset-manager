import { FormProvider } from '../../components/form/FormProvider'
import { TxnForm } from '../../components/txn/TxnForm'


export default function AddTransaction(props) {
    return (
        <FormProvider model={props.asset}>
            <TxnForm mode='ADD' />
        </FormProvider>
    )
}


export async function getServerSideProps(context) {
    const _breadcrumbs = [
        { title: 'ASSET MANAGER', href: "/" },
        { title: 'ADD ASSET', href: "#", active: true },
    ]

    const _asset = {
        CODE: '', NAME: '', CATEGORY: '', INSTRUMENT: '', HOLDER: '', INSTITUTION: '', 
        FUND_HOUSE: '', START_DATE: '', END_DATE: '', PORTFOLIO: [], STATUS: 'A'
    }

    return {
        props: {
            breadcrumbs: _breadcrumbs,
            asset: _asset
        },
    }
}