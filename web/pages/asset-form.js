import { getAsset } from '../dao/asset-dao'
import { FormProvider } from '../components/form/FormProvider'
import { AssetForm } from '../components/asset/AssetForm'


export default function AssetFormView(props) {
    return (
        <FormProvider model={props.asset}>
            <AssetForm mode={props.formMode} />
        </FormProvider>
    )
}


export async function getServerSideProps(context) {

    const query = context.query

    const _breadcrumbs = [
        { title: 'ASSET MANAGER', href: "/" }
    ]

    let _asset = {}

    if (query.mode === 'NEW') {
        _breadcrumbs.push({ title: 'ADD ASSET', href: "#", active: true })

        _asset = { CODE: '', NAME: '', CATEGORY: '', INSTRUMENT: '', HOLDER: '', INSTITUTION: '',
            FUND_HOUSE: '', START_DATE: '', END_DATE: '', PORTFOLIO: [], STATUS: 'A'
        }
    } 

    
    if (query.mode === 'EDIT') {
        _breadcrumbs.push({ title: 'EDIT ASSET', href: "#", active: true })

        _asset = await getAsset(query.code)
        _asset = JSON.parse(JSON.stringify(_asset[0]))
        _asset['PORTFOLIO'] = _asset['PORTFOLIO'].split(',')        
    } 

    console.log(_asset)

    return {
        props: {
            breadcrumbs: _breadcrumbs,
            asset: _asset,
            formMode: query.mode
        },
    }
}