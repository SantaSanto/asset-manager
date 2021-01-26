import { getAsset } from '../dao/asset-dao'
import { FormProvider } from '../components/form/FormProvider'
import TxnFilter from '../components/txn/TxnFilter'
import AssetDetails from '../components/asset/AssetDetails'
import TxnList from '../components/txn/TxnList'


export default function ListView(props) {
    return (
        <FormProvider model={props.filter}>
            <AssetDetails asset={props.asset} />
            <TxnFilter assetId={props.asset['ID']} />
            <br/>
            <TxnList />
        </FormProvider>
    )
}

export async function getServerSideProps(context) {

    const query = context.query

    const _breadcrumbs = [
        { title: 'ASSET MANAGER', href: "/" },
        { title: 'ASSETS', href: "#", active: true },
    ]

    const _filter = {
        assetId: query.assetId,
        year: '2020', month: 'ALL', category: 'ALL', status: 'A'
    }

   
    let _asset = await getAsset(query.assetId)
    _asset = JSON.parse(JSON.stringify(_asset))[0]

    return {
        props: {
            breadcrumbs: _breadcrumbs,
            filter: _filter,
            asset: _asset
        }
    }
}