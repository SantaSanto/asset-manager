import { useContext, useState, useEffect } from 'react'
import withQuery from 'with-query'
import Table from 'react-bootstrap/Table'
import TableHeader from '../table/TableHeader'

import { FormContext } from '../form/FormProvider'

const tableHeader = {
    label: ['CODE', 'NAME', 'CATEGORY', 'INSTRUMENT', 'HOLDER', 'INSTITUTION', 'INVESTED', 'CURRENT', 'PROFIT', 'ROI'],
    align: ['left', 'left', 'left', 'left', 'left', 'left', 'right', 'right', 'right', 'right']
}

export default function AssetList() {
    const [ assets, setAssets] = useState([])
    const { formState } = useContext(FormContext)
    const { formData } = formState

    useEffect(() => {
        fetch(withQuery('/api/assets', formData), getHeader())
            .then(handleErrors)
            .then(res => res.json())
            .then(res => setAssets(res) )
            .catch(error => console.log(error))          
        }, [formState]
    )

    return (
        <Table>
            <TableHeader header={tableHeader} />
            <tbody> {
                assets.map(asset => (
                    <tr key={asset.CODE} >
                        <td>
                            <a href={`/txn-list?code=${asset.CODE}`}>
                                {asset.CODE}
                            </a>
                        </td>
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

function getHeader() {
    return {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}