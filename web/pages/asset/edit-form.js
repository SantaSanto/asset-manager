import { getAsset } from '../../dao/asset-dao'

import { FormProvider } from '../../components/form/FormProvider'
import { AssetForm } from '../../components/asset/AssetForm'


export default function AddAsset(props) {
    return (
        <FormProvider model={props.asset}>
            <AssetForm mode='EDIT' />
        </FormProvider>
    )
}


export async function getServerSideProps(context) {
    const _breadcrumbs = [
        { title: 'ASSET MANAGER', href: "/" },
        { title: 'ADD ASSET', href: "#", active: true },
    ]

    const query = context.query
    let _asset = await getAsset(query.code)
    _asset = JSON.parse(JSON.stringify(_asset[0]))
    _asset['PORTFOLIO'] = _asset['PORTFOLIO'].split(',')
    console.log(_asset)

    return {
        props: {
            breadcrumbs: _breadcrumbs,
            asset: _asset
        },
    }
}