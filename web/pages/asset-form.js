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

    const _breadcrumb = { key: 'ASSET_FORM', title: '', href: '#', active: true }

    let _asset = {}

    if (query.mode === 'NEW') {
        _breadcrumb.title = 'ADD ASSET'

        _asset = { CODE: '', NAME: '', CATEGORY: '', INSTRUMENT: '', HOLDER: '', INSTITUTION: '',
            FUND_HOUSE: '', START_DATE: '', END_DATE: '', PORTFOLIO: [], STATUS: 'A'
        }
    } 

    
    if (query.mode === 'EDIT') {
        _breadcrumb.title = 'EDIT ASSET'

        _asset = await getAsset(query.assetId)
        _asset = JSON.parse(JSON.stringify(_asset[0]))
        _asset['PORTFOLIO'] = _asset['PORTFOLIO'].split(',')        
    } 


    return {
        props: {
            breadcrumb: _breadcrumb,
            asset: _asset,
            formMode: query.mode
        },
    }
}