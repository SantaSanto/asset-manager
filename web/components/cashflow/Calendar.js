import { useContext, useState, useEffect } from 'react'
import Chart from "react-google-charts"
import withQuery from 'with-query'


import { FormContext } from '../form/FormProvider'

export default function Calendar() {
    const [ cashflows, setCashflows ] = useState([])
    const { formState } = useContext(FormContext)
    const { formData } = formState

    useEffect(() => {
        fetch(withQuery('/api/cashflow', formData), getHTTPHeader())
            .then(handleErrors)
            .then(res => res.json())
            .then(res => setCashflows(res))
            .catch(error => console.log(error))
    }, [formState]
    )

    return (
        <Chart chartType="Calendar" width="100%" height="400px" data={format(cashflows)} options={chartOptions} />
    )
}

function getHTTPHeader() {
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

const chartOptions = {
    colorAxis: { minValue: 0, colors: ['#0000F0', '#0000FF'] }
}

function format(cashflows) {
    const data = [
        [{ type: `date`, id: `Date` }, { type: "number", id: `cashflow` } ]
    ]

    cashflows.forEach(cashflow => {
        const cfItem = [ new Date(cashflow['DATE']), cashflow['AMOUNT'] ]
        data.push(cfItem)
    })

    return data
}