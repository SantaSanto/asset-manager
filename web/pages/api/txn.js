import { createTxn, getTxns, updateTxn } from '../../dao/txn-dao'

export default (req, res) => {
    switch (req.method) {
        case 'POST': return onPost(req, res)
        case 'PUT': return onPut(req, res)
    }

    res.status(405).end()
}


async function onPost(req, res) {
    const txn = req.body    
    try {
        await createTxn(txn)
        res.status(200).end()
    } catch(error) {
        console.log(error)
        res.status(500).end()
    }   
}

async function onPut(req, res) {
    const txn = req.body   

    try {
        await updateTxn(txn)
        res.status(200).end()
    } catch(error) {
        console.log(error)
        res.status(500).end()
    }   
}