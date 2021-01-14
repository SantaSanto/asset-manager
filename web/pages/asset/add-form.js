import { FormProvider } from '../../components/form/FormProvider'
import { AssetForm } from '../../components/asset/AssetForm'


export default function AddAsset(props) {
    return (
        <FormProvider model={props.asset}>
            <AssetForm mode='ADD' />
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