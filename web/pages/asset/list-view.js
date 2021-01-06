import { FormProvider } from '../../components/form/FormProvider'
import Form from 'react-bootstrap/Form'

import SelectField from '../../components/form/SelectField'
import AssetList from '../../components/asset/AssetList'

import { getAssets } from '../../dao/asset-dao'

export default function ListView(props) {
    return (
        <FormProvider model={{}}>
            <Form style={{ padding: '0px 10px' }}>
                <Form.Row>
                    <SelectField label='CATEGORY' name='category' options={[]} />
                    <SelectField label='INSTRUMENT' name='instrument' options={[]} />
                    <SelectField label='HOLDER' name='holder' options={[]} />
                    <SelectField label='INSTITUTION' name='institution' options={[]} />
                    <SelectField label='STATUS' name='status' options={[]} />
                </Form.Row>
            </Form>
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

    const _assets = await getAssets()
    console.log(_assets)

    return {
        props: {
            breadcrumbs: _breadcrumbs,
            assets: JSON.parse(JSON.stringify(_assets))
        }
    }
}