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
    const url = context.resolvedUrl
    const query = context.query

    const _breadcrumb = { key:'TXN_LIST', title: 'XS', href: url, active: true }

    const _filter = {
        ASSET_ID: query.assetId,
        YEAR: '2020', MONTH: 'ALL', CATEGORY: 'ALL', TIMELINE: 'COMPLETED', STATUS: 'A'
    }

   
    let _asset = await getAsset(query.assetId)
    _asset = JSON.parse(JSON.stringify(_asset))[0]
    
    _breadcrumb.title = _asset['NAME']

    return {
        props: {
            breadcrumb: _breadcrumb,
            filter: _filter,
            asset: _asset
        }
    }
}