import { getAsset } from '../dao/asset-dao'
import { FormProvider } from '../components/form/FormProvider'
import TxnFilter from '../components/txn/TxnFilter'
import AssetDetails from '../components/asset/AssetDetails'


export default function ListView(props) {
    return (
        <FormProvider model={props.filter}>
            <AssetDetails asset={props.asset} />
            <TxnFilter />
        </FormProvider>
    )
}

export async function getServerSideProps(context) {
    const _breadcrumbs = [
        { title: 'ASSET MANAGER', href: "/" },
        { title: 'ASSETS', href: "#", active: true },
    ]

    const _filter = {
        portfolio: 'ALL', category: 'ALL', instrument: 'ALL', holder: 'ALL',
        institution: 'ALL', status: 'A'
    }

    const query = context.query
    let _asset = await getAsset(query.code)
    _asset = JSON.parse(JSON.stringify(_asset))[0]

    return {
        props: {
            breadcrumbs: _breadcrumbs,
            filter: _filter,
            asset: _asset
        }
    }
}