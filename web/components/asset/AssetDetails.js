import React from "react"
import Table from 'react-bootstrap/Table'

export default function AssetDetails(props) {
    const { asset } = props
    return (
        <Table bordered size='sm'>
            <tbody>
                <tr>
                    <AssetData label='NAME' value={asset.NAME} />
                    <AssetData label='INVESTED' value='10,00,000' />
                    <AssetData label='START DATE' value={asset.START_DATE} />
                    <AssetData label='CODE' value={asset.CODE} />
                    <EditAsset value={asset.CODE} />
                </tr>
                <tr>
                    <AssetData label='INSTRUMENT' value={`${asset.CATEGORY} ${asset.INSTRUMENT}`} />
                    <AssetData label='CURRENT' value='10,00,000' />
                    <AssetData label='END DATE' value={asset.END_DATE} />
                    <AssetData label='HOLDER' value={asset.HOLDER} colSpan='2' />
                </tr>
                <tr>
                    <AssetData label='INSTITUTION' value={`${asset.INSTITUTION} ${asset.INSTITUTION}`} />
                    <AssetData label='PROFIT' value='10,00,000' />
                    <AssetData label='ROI' value='12.56 %' />
                    <AssetData label='STATUS' value={asset.STATUS} colSpan='2' />
                </tr>
            </tbody>
        </Table>
    )
}

const AssetData = ({ label, value, colSpan = 1 }) => (
    <React.Fragment>
        <th className="text-right">{label}</th>
        <td colSpan={colSpan} className='ad-td'>{value}</td>
    </React.Fragment>
)


const EditAsset = ({ value }) => (
    <td className='ad-td text-center'>
        <a href={`/asset/edit-form?code=${value}`}>
            <i className="fa fa-pencil" />
        </a>
    </td>
)
