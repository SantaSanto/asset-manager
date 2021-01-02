import { FormProvider } from '../../components/form/FormProvider'
import { AssetForm } from '../../components/asset/AssetForm'


export default function AddAsset(props) {
    return (
        <FormProvider>
            <AssetForm />
        </FormProvider>

    )
}


export async function getServerSideProps(context) {
    const _breadcrumbs = [
        { title: 'ASSET MANAGER', href: "/" },
        { title: 'ADD ASSET', href: "#", active: true },
    ]

    return {
        props: {
            breadcrumbs: _breadcrumbs
        },
    }
}