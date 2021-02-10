const xirr = require('xirr')
const { execute } = require('./common/db.js')


async function initBatch() {
    console.log('Batch - Update Asset - Started')

    const assets = await getAssets()
    assets.forEach(asset => processAsset(asset))

    console.log('Batch - Update Asset - Ends')
}

async function processAsset(asset) {
    const assetId = asset['ID']
    console.log(`Upading Asset with ID ${assetId}`)
    
    const navTxn = await getLatestNav(assetId)
    let current = 0 

    if(navTxn.length > 0) {
        current = navTxn[0]['AMOUNT']       
    } else {
        const totalTxn = await getTotal(assetId)
        current = (totalTxn.length > 0) ? totalTxn[0]['AMOUNT'] : current
    }

    const cashflows = await getCashFlows(assetId)
    const xirrCF = cashflows.map( cf => {
        return {
            amount: cf['AMOUNT'],
            when: new Date(cf['DATE'])    
        }
    })

    xirrCF.push({
        amount: current,
        when: new Date(asset['END_DATE']) 
    })

    let roi = 0

    try {
        roi = xirr(xirrCF, {guess: 1})
        roi = Number.parseFloat(roi * 100).toFixed(2)
    } catch (e) {
        console.log(`Error in XIRR for asset - ${assetId} `)
        console.log(e)
    }

    const newAsset = {
        ID: assetId,
        CURRENT: current,
        ROI: roi,
        DIRTY: 'F'
    }

    updateAsset(newAsset)
}

function getAssets() {
    const sql = `SELECT ID, DATE_FORMAT(END_DATE, '%Y-%m-%d') AS END_DATE ` +
                `FROM ASSET WHERE DIRTY = 'T'`
    return execute(sql)
}

function getLatestNav(assetId) {
    let sql = `SELECT AMOUNT FROM TXN ` +
              `WHERE STATUS = 'C' AND CATEGORY IN ('MATURITY', 'NAV') AND ASSET_ID = '${assetId}' `+
              `ORDER BY DATE DESC LIMIT 1`
    return execute(sql)
}

function getTotal(assetId) {
    let sql = `SELECT COALESCE(SUM(AMOUNT), 0) AS AMOUNT FROM TXN WHERE CATEGORY IN ` +
              `('DEPOSIT', 'CREDIT') AND ASSET_ID = '${assetId}'`
    return execute(sql)
}

function getCashFlows(assetId) {
    const sql = `SELECT DATE_FORMAT(DATE, '%Y-%m-%d') AS DATE, (AMOUNT * -1) AS AMOUNT ` +
                `FROM TXN WHERE STATUS = 'C' AND CATEGORY = 'DEPOSIT' AND ASSET_ID = '${assetId}' ` +
                `ORDER BY DATE ASC`
    return execute(sql)
}

function updateAsset(asset) {
    const { ID, CURRENT, ROI, DIRTY } = asset
    let sql = ''
    sql += `UPDATE ASSET SET CURRENT='${CURRENT}', ROI='${ROI}', DIRTY='${DIRTY}' `
    sql += `WHERE ID = '${ID}'`
    
    return execute(sql)
}


initBatch()