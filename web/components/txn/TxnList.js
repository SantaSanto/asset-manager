import { useContext, useState, useEffect } from 'react'
import withQuery from 'with-query'
import Table from 'react-bootstrap/Table'
import TableHeader from '../table/TableHeader'

import { FormContext } from '../form/FormProvider'

const tableHeader = {
    label: ['DATE', 'DESCRIPTION', 'CATEGORY', 'TIMELINE', 'UNIT', 'VALUE', 'AMOUNT'],
    align: ['left', 'left', 'left', 'left', 'right', 'right', 'right']
}

export default function TransactionList() {
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
                        <td><a href={`/txn-form?mode=EDIT&txnId=${txn.ID}`}>{txn.DATE}</a></td>
                        <td width='400px'>{txn.COMMENTS}</td>
                        <td>{txn.CATEGORY}</td>
                        <td>{timeLine(txn.TIMELINE)}</td>
                        <td className="text-right">{txn.UNIT}</td>
                        <td className="text-right">{txn.VALUE}</td>
                        <td className="text-right">{txn.AMOUNT}</td>
                    </tr>
                )
            )}
            </tbody>
            <tfoot>
                <tr>
                    <th colSpan='7'>2 TRANSACTIONS</th>
                </tr>
            </tfoot>
        </Table>
    )
}

function timeLine(code) {
    switch(code) {
        case 'C': return 'COMPLETED'
        case 'E': return 'EXPECTED'
        default : return code
    }
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