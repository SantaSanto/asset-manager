const { execute } = require('./common/db.js')

console.log('Batch - Update Asset - Started')
initBatch()
console.log('Batch - Update Asset - Ends')

async function initBatch() {
    const assets = await getAssets()
    assets.forEach(asset => processAsset(asset))
}

async function processAsset(asset) {
    const assetId = asset['ID']
    console.log(`Upading Asset with ID ${assetId}`)
    
    const txn = await getCurrent(assetId)
    let current = 0 

    if(txn.length > 0) {
        current = txn[0]['AMOUNT']       
    }

    const newAsset = {
        ID: assetId,
        CURRENT: current,
        DIRTY: 'F'
    }

    updateAsset(newAsset)
}

function getAssets() {
    const sql = `SELECT ID FROM ASSET WHERE DIRTY = 'T'`
    return execute(sql)
}

function getCurrent(assetId) {
    let sql = `SELECT DATE, CATEGORY, AMOUNT FROM TXN ` +
              `WHERE STATUS = 'C' AND CATEGORY IN ('MATURITY', 'NAV') AND ASSET_ID = '${assetId}' `+
              `ORDER BY DATE DESC LIMIT 1`
    return execute(sql)
}

function updateAsset(asset) {
    const { ID, CURRENT, DIRTY } = asset
    let sql = ''
    sql += `UPDATE ASSET SET CURRENT='${CURRENT}', DIRTY='${DIRTY}' `
    sql += `WHERE ID = '${ID}'`

    return execute(sql)
}



