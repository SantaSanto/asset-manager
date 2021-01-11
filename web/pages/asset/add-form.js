import { FormProvider } from '../../components/form/FormProvider'
import { AssetForm } from '../../components/asset/AssetForm'


export default function AddAsset(props) {
    return (
        <FormProvider model={props.asset}>
            <AssetForm />
        </FormProvider>
    )
}


export async function getServerSideProps(context) {
    const _breadcrumbs = [
        { title: 'ASSET MANAGER', href: "/" },
        { title: 'ADD ASSET', href: "#", active: true },
    ]

    const _asset = {
        code: '', name: '', category: '', instrument: '', holder: '',
        institution: '', fundHouse: '', startDate: '', endDate: '',
        portfolio: [], status: 'A'
    }

    return {
        props: {
            breadcrumbs: _breadcrumbs,
            asset: _asset
        },
    }
}