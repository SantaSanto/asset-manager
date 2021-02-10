import { createTxn, updateTxn } from '../../dao/txn-dao'
import { setDirty } from '../../dao/asset-dao'

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
        const assetId = txn['ASSET_ID'] 
        await setDirty(assetId)
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
        const assetId = txn['ASSET_ID'] 
        await setDirty(assetId)
        res.status(200).end()
    } catch(error) {
        console.log(error)
        res.status(500).end()
    }   
}