import { getTxns } from '../../dao/txn-dao'

export default (req, res) => {
    switch (req.method) {
        case 'GET': return onGet(req, res)
    }

    res.status(405).end()
}

async function onGet(req, res) {
    const txnFilter = {}
    txnFilter['ASSET_ID'] = req.query['ASSET_ID']
    txnFilter['year'] = req.query['year']
    txnFilter['month'] = req.query['month']
    txnFilter['category'] = req.query['category']
    txnFilter['status'] = req.query['status']

    try {
        const txns = await getTxns(txnFilter)
        res.status(200).json(txns)
    } catch(error) {
        console.log(error)
        res.status(500).end()
    }   
}