import React from "react"
import Table from 'react-bootstrap/Table'

export default function AssetDetails(props) {
    const { asset } = props
    return (
        <Table bordered size='sm'>
            <tbody>
                <tr>
                    <AssetData label='NAME' value={asset.NAME} colSpan='2' />
                    <AssetData label='INVESTED' value='10,00,000' />
                    <AssetData label='START DATE' value={asset.START_DATE} />
                    <AssetData label='CODE' value={asset.CODE} />
                    <EditAsset value={asset.CODE} />
                </tr>
                <tr>
                    <AssetData2 label='INSTRUMENT' first={asset.CATEGORY} second={asset.INSTRUMENT} />
                    <AssetData  label='CURRENT' value='10,00,000' />
                    <AssetData  label='END DATE' value={asset.END_DATE} />
                    <AssetData  label='HOLDER' value={asset.HOLDER} colSpan='2' />
                </tr>
                <tr>
                    <AssetData2 label='INSTITUTION' first={asset.INSTITUTION} second={asset.FUND_HOUSE} />
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

const AssetData2 = ({ label, first, second, colSpan = 1 }) => (
    <React.Fragment>
        <th className="text-right">{label}</th>
        <td colSpan={colSpan} className='ad-td'>{first}</td>
        <td colSpan={colSpan} className='ad-td'>{second}</td>
    </React.Fragment>
)


const EditAsset = ({ value }) => (
    <td className='ad-td text-center'>
        <a href={`/asset-form?mode=EDIT&code=${value}`}>
            <i className="fa fa-pencil" />
        </a>
    </td>
)
