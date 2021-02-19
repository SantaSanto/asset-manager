import { getCashflows } from '../../dao/cashflow'

export default (req, res) => {
    switch (req.method) {
        case 'GET': return onGet(req, res)
    }

    res.status(405).end()
}

async function onGet(req, res) {
    const filter = {}
    filter['PORTFOLIO'] = req.query['PORTFOLIO']
    filter['HOLDER'] = req.query['HOLDER']
    filter['INSTITUTION'] = req.query['INSTITUTION']
    filter['CATEGORY'] = req.query['CATEGORY']
    filter['YEAR'] = req.query['YEAR']   

    try {
        const cashflows = await getCashflows(filter)
        res.status(200).json(cashflows)
    } catch(error) {
        console.log(error)
        res.status(500).end()
    }   
}