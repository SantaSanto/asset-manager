import React from "react"
import Table from 'react-bootstrap/Table'

export default function AssetDetails(props) {
    const { asset } = props
    return (
        <Table bordered size='sm'>
            <tbody>
                <tr>
                    <EditAsset  label='NAME' value={asset.NAME} assetId={asset.ID} />                                      
                    <AssetData  label='HOLDER' value={asset.HOLDER} />
                    <AssetData  label='INVESTED' value='10,00,000' colSpan='2' /> 
                    <AssetData  label='START DATE' value={asset.START_DATE} />
                </tr>
                <tr>
                    <AssetData  label='CATEGORY' value={asset.CATEGORY} />                                   
                    <AssetData  label='INSTRUMENT' value={asset.INSTRUMENT} />  
                    <AssetData  label='CURRENT' value='10,00,000' colSpan='2' />    
                    <AssetData  label='END DATE' value={asset.END_DATE} />
                </tr>
                <tr>
                    <AssetData  label='INSTITUTION' value={asset.INSTITUTION} />                    
                    <AssetData  label='FUND HOUSE' value={asset.FUND_HOUSE} /> 
                    <AssetData2 label='PROFIT' first='10,00,000' second='12.56 %' />  
                    <AssetData  label='STATUS' value={asset.STATUS} colSpan='2' />
                </tr>
            </tbody>
        </Table>
    )
}

const EditAsset = ({ label, value, assetId, colSpan = 1 }) => (
    <React.Fragment>
        <th className="text-right">{label}</th>
        <td colSpan={colSpan} className='ad-td'>
            <a href={`/asset-form?mode=EDIT&assetId=${assetId}`}>{value}</a>
        </td>
    </React.Fragment>
)

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


// const EditAsset = ({ value }) => (
//     <td className='ad-td text-right' colSpan='1'>
//         <a href={`/asset-form?mode=EDIT&code=${value}`}>
//             <i className="fa fa-pencil" />
//         </a>
//     </td>
// )
