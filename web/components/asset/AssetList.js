import { useContext, useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import withQuery from 'with-query'
import Currency from '../format/Currency'

import TableHeader from '../table/TableHeader'
import { FormContext } from '../form/FormProvider'

const tableHeader = {
    label: ['NAME', 'CATEGORY', 'INSTRUMENT', 'HOLDER', 'INSTITUTION', 'CURRENT', 'ROI'],
    align: ['left', 'left', 'left', 'left', 'left', 'right', 'right']
}

export default function AssetList() {
    const [assets, setAssets] = useState([])
    const { formState } = useContext(FormContext)
    const { formData } = formState

    useEffect(() => {
        fetch(withQuery('/api/assets', formData), getHeader())
            .then(handleErrors)
            .then(res => res.json())
            .then(res => setAssets(res))
            .catch(error => console.log(error))
    }, [formState]
    )

    return (
        <Table>
            <TableHeader header={tableHeader} />
            <TableBody assets={assets} /> 
            <TableFooter assets={assets} />
        </Table>
    )
}

function TableBody({ assets }) {
    return (
        <tbody> { assets.map(asset => (
            <tr key={asset.ID} >
            <td><a href={`/txn-list?assetId=${asset.ID}`}>{asset.NAME}</a></td>
            <td>{asset.CATEGORY}</td>
            <td>{asset.INSTRUMENT}</td>
            <td>{asset.HOLDER}</td>
            <td>{asset.INSTITUTION}</td>
            <td className="text-right">
                <Currency value={asset.CURRENT} />
            </td>
            <td className="text-right">00.00</td>
        </tr>
    ))}
    </tbody> 
    )           
}

function TableFooter({ assets }) {
    let total = 0
    const count = assets.length
    assets.forEach((asset) => {
        total = total + asset['CURRENT']
    })

    total = Number.parseFloat(total).toFixed(0)

    return (
        <tfoot>
            <tr>
                <th colSpan='5'>{`${count} ASSETS`}</th>
                <th className="text-right">
                    <Currency value={total} />
                </th>
                <th className="text-right">00.00</th>
            </tr>
        </tfoot>
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