import { useContext, useState, useEffect } from 'react'
import withQuery from 'with-query'
import Table from 'react-bootstrap/Table'
import TableHeader from '../table/TableHeader'

import { FormContext } from '../form/FormProvider'

const tableHeader = {
    label: ['DATE', 'DESCRIPTION', 'CATEGORY', 'UNIT', 'VALUE', 'AMOUNT'],
    align: ['left', 'left', 'left', 'right', 'right', 'right']
}

export default function AssetList() {
    const [txns, setTxns] = useState([])
    const { formState } = useContext(FormContext)
    const { formData } = formState

    useEffect(() => {
        fetch(withQuery('/api/txns', formData), getHeader())
            .then(handleErrors)
            .then(res => res.json())
            .then(res => setTxns(res))
            .catch(error => console.log(error))
    }, [formState]
    )

    return (
        <Table>
            <TableHeader header={tableHeader} />
            <tbody> {
                txns.map(txn => (
                    <tr key={txn.ID} >
                        <td><a href='#'>{txn.DATE}</a></td>
                        <td>{txn.COMMENTS}</td>
                        <td>{txn.CATEGORY}</td>
                        <td className="text-right">{txn.UNIT}</td>
                        <td className="text-right">{txn.VALUE}</td>
                        <td className="text-right">{txn.AMOUNT}</td>
                    </tr>
                )
            )}
            </tbody>
            <tfoot>
                <tr>
                    <th colSpan='6'>2 of 25 TRANSACTIONS</th>
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