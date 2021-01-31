import { FormProvider } from '../components/form/FormProvider'
import AssetFilter from '../components/asset/AssetFilter'
import AssetList from '../components/asset/AssetList'

export default function AssetListView(props) {
    return (
        <FormProvider model={props.filter}>
            <AssetFilter />
            <br/>
            <AssetList />
        </FormProvider>
    )
}

export async function getServerSideProps(context) {

    const query = context.query

    const _portfolio = (query['portfolio'])?query['portfolio']: 'ALL'
    console.log(`Portfolio: ${_portfolio}`)

    const _breadcrumbs = [
        { title: 'ASSET MANAGER', href: "/" },
        { title: 'ASSETS', href: "#", active: true },
    ]

    const _filter = {
        portfolio: _portfolio, 
        category: 'ALL', 
        instrument: 'ALL', 
        holder: 'ALL',
        institution: 'ALL', 
        status: 'A'
    }

    return {
        props: {
            breadcrumbs: _breadcrumbs,
            filter: _filter
        }
    }
}