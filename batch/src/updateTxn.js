const { execute } = require('./common/db.js')


async function initBatch() {
    console.log('Batch - Update Ttansaction - Started')

    const navTxns = await getMultiNavTxns()
    navTxns.forEach(txn => processTxn(txn))

    console.log('Batch - Update Ttansaction - Ends')
}

async function processTxn(txn) {
    const { ASSET_ID: assetId } = txn
    console.log(`Upading Txn with Asset ID ${assetId}`)

    await archiveNavTxn(assetId)

    const latestNavTxn = await getLatestNavTxn(assetId)
    latestNavTxn.forEach( txn => updateNavTxn(txn['ID']) )
}

function getMultiNavTxns() {
    const sql = `SELECT ASSET_ID, COUNT(ASSET_ID) AS COUNT FROM TXN ` +
                `WHERE CATEGORY = 'NAV' AND STATUS = 'C' ` +
                `GROUP BY ASSET_ID HAVING COUNT > 1`
    return execute(sql)
}

function getLatestNavTxn(assetId) {
    const sql = `SELECT ID FROM TXN WHERE CATEGORY = 'NAV' AND ASSET_ID = '${assetId}' ` +
                `ORDER BY DATE DESC LIMIT 1`
    return execute(sql)
}

function archiveNavTxn(assetId) {    
    const sql = `UPDATE TXN SET STATUS='A' WHERE CATEGORY='NAV' AND ASSET_ID = '${assetId}'`    
    return execute(sql)
}

function updateNavTxn(txnId) {    
    const sql = `UPDATE TXN SET STATUS='C' WHERE ID = '${txnId}'`    
    return execute(sql)
}

initBatch()