

import { FormProvider } from '../../components/form/FormProvider'
import AssetFilter from '../../components/asset/AssetFilter'
import AssetList from '../../components/asset/AssetList'

import { getAssets } from '../../dao/asset-dao'

export default function ListView(props) {
    return (
        <FormProvider model={props.filter}>
            <AssetFilter />
            <br/>
            <AssetList assets={props.assets} />
        </FormProvider>
    )
}

export async function getServerSideProps(context) {
    const _breadcrumbs = [
        { title: 'ASSET MANAGER', href: "/" },
        { title: 'ASSETS', href: "#", active: true },
    ]

    const _filter = {
        group: 'ALL', category: 'ALL', instrument: 'ALL', holder: 'ALL',
        institution: 'ALL', status: 'A'
    }

    const _assets = await getAssets()
    console.log(_assets)

    return {
        props: {
            breadcrumbs: _breadcrumbs,
            filter: _filter,
            assets: JSON.parse(JSON.stringify(_assets))
        }
    }
}