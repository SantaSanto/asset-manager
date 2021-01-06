import Table from 'react-bootstrap/Table'
import TableHeader from '../table/TableHeader'

const header = {
    label: ['CODE', 'NAME', 'CATEGORY', 'INSTRUMENT', 'HOLDER', 'INSTITUTION', 'INVESTED', 'CURRENT', 'PROFIT', 'ROI'],
    align: ['left', 'left', 'left', 'left', 'left', 'left', 'right', 'right', 'right', 'right']
}

export default function AssetList({assets}) {
    return (
        <Table>
            <TableHeader header={header} />
            <tbody> {
                assets.map(asset => (
                    <tr key={asset.CODE} >
                        <td><a href='#'>{asset.CODE}</a></td>
                        <td>{asset.NAME}</td>
                        <td>{asset.CATEGORY}</td>
                        <td>{asset.INSTRUMENT}</td>
                        <td>{asset.HOLDER}</td>
                        <td>{asset.INSTITUTION}</td>
                        <td className="text-right">10,00,000</td>
                        <td className="text-right">10,00,000</td>
                        <td className="text-right">10,00,000</td>
                        <td className="text-right">12.56</td>
                    </tr>
                )
                )}
            </tbody>
            <tfoot>
                <tr>
                    <th colSpan='6'>2 OF 25 ASSETS</th>
                    <th className="text-right">0</th>
                    <th className="text-right">0</th>
                    <th className="text-right">0</th>
                    <th className="text-right">12.56</th>
                </tr>
            </tfoot>
        </Table>
    )
}