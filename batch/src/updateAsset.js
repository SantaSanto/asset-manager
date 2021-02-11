const xirr = require('xirr')
const { execute } = require('./common/db.js')


async function initBatch() {
    console.log('Batch - Update Asset - Started')

    const assets = await getAssets()
    assets.forEach(asset => processAsset(asset))

    console.log('Batch - Update Asset - Ends')
}

async function processAsset(asset) {
    const { ID: assetId, END_DATE: assetEndDate } = asset
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

    const hasNav = cashflows.some( cf => { 
        const cat = cf['CATEGORY']
        return (cat === 'NAV' || cat === 'MATURITY') 
    })
   
    if(!hasNav) {
        xirrCF.push({
            amount: current,
            when: new Date(assetEndDate) 
        })    
    }

    try {
        let roi = xirr(xirrCF, {guess: 1})
        roi = Number.parseFloat(roi * 100).toFixed(2)

        const newAsset = {
            ID: assetId,
            CURRENT: current,
            ROI: roi,
            DIRTY: 'F'
        }
    
        updateAsset(newAsset)


    } catch (e) {
        console.log(`Error in XIRR for asset - ${assetId} `)
        console.log(e)
    }


}

function getAssets() {
    const sql = `SELECT ID, DATE_FORMAT(END_DATE, '%Y-%m-%d') AS END_DATE ` +
                `FROM ASSET WHERE DIRTY = 'T'`
    return execute(sql)
}

function getLatestNav(assetId) {
    const sql = `SELECT AMOUNT FROM TXN ` +
                `WHERE STATUS = 'C' AND CATEGORY IN ('MATURITY', 'NAV') AND TIMELINE='C' ` +
                `AND ASSET_ID = '${assetId}' ORDER BY DATE DESC LIMIT 1`
    return execute(sql)
}

function getTotal(assetId) {
    const sql = `SELECT COALESCE(SUM(AMOUNT), 0) AS AMOUNT FROM TXN WHERE CATEGORY IN ` +
                `('DEPOSIT', 'CREDIT') AND STATUS = 'C' AND TIMELINE='C' AND ASSET_ID = '${assetId}'`
    return execute(sql)
}

function getCashFlows(assetId) {
    const sql = `SELECT DATE_FORMAT(DATE, '%Y-%m-%d') AS DATE, CATEGORY, ` +
                `CASE WHEN CATEGORY = 'DEPOSIT' THEN (AMOUNT * -1) ELSE AMOUNT END AS AMOUNT ` +
                `FROM TXN WHERE STATUS = 'C' AND CATEGORY IN ('DEPOSIT', 'MATURITY', 'NAV') AND ` +
                `ASSET_ID = '${assetId}' ORDER BY DATE ASC`
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