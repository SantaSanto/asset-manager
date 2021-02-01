import { createTxn, getTxns, updateTxn } from '../../dao/txn-dao'
import { updateAssetDtls } from '../../dao/asset-dao'

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
        await updateAssetDetails(txn)
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
        await updateAssetDetails(txn)
        res.status(200).end()
    } catch(error) {
        console.log(error)
        res.status(500).end()
    }   
}


async function updateAssetDetails(txn) {
    const txnFilter = {}
    txnFilter['ASSET_ID'] = txn['ASSET_ID']
    txnFilter['CATEGORY'] = 'ALL'
    txnFilter['TIMELINE'] = 'C'    
    txnFilter['STATUS']   = 'C'

    try {        
        const txns = await getTxns(txnFilter)            
        let current = 0        

        for(const txn of txns) {

            if(txn['CATEGORY'] === 'NAV') {
                current = txn['AMOUNT']
                break
            }

            current = current + txn['AMOUNT']
        }

        const assetDtls = {
            ID: txn['ASSET_ID'],
            CURRENT: current
        }

        await updateAssetDtls(assetDtls)

    } catch(error) {
        console.log(error)        
    }   
}