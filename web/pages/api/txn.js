import { createTxn, getTxns } from '../../dao/txn-dao'
import { updateAssetDtls } from '../../dao/asset-dao'

export default (req, res) => {
    switch (req.method) {
        case 'POST': return onPost(req, res)
        // case 'PUT': return onPut(req, res)
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

async function updateAssetDetails(txn) {
    const txnFilter = {}
    txnFilter['ASSET_ID'] = txn['ASSET_ID']

    try {
        let current = 0
        const txns = await getTxns(txnFilter)    
        
        txns.forEach(txn => {
            current = current + txn['AMOUNT']
        })

        const assetDtls = {
            ID: txn['ASSET_ID'],
            CURRENT: current
        }

        await updateAssetDtls(assetDtls)

    } catch(error) {
        console.log(error)        
    }   
}

// async function onPut(req, res) {
//     const txn = req.body

//     try {
//         await updateAsset(asset)
//         res.status(200).end()
//     } catch(error) {
//         console.log(error)
//         res.status(500).end()
//     }   
// }