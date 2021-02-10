import getConnection from './db'

export function createAsset(asset) {
    const { NAME, CATEGORY, INSTRUMENT, HOLDER, INSTITUTION, FUND_HOUSE, PORTFOLIO } = asset 
    const { START_DATE, END_DATE, STATUS } = asset 
    let sql = ''
    sql += 'INSERT INTO ASSET (NAME, CATEGORY, INSTRUMENT, HOLDER, INSTITUTION, FUND_HOUSE, PORTFOLIO, '
    sql += 'START_DATE, END_DATE, STATUS, CURRENT) VALUES ('
    sql += `'${NAME}', '${CATEGORY}', '${INSTRUMENT}', '${HOLDER}', '${INSTITUTION}', '${FUND_HOUSE}', '${PORTFOLIO}', `
    sql += `'${START_DATE}', '${END_DATE}', '${STATUS}', '0')`

    return execute(sql)
}

export function updateAsset(asset) {
    let sql = ''
    sql += 'UPDATE ASSET SET '
    sql += `NAME='${asset.NAME}', CATEGORY='${asset.CATEGORY}', INSTRUMENT='${asset.INSTRUMENT}', `
    sql += `HOLDER='${asset.HOLDER}', INSTITUTION='${asset.INSTITUTION}', `
    sql += `FUND_HOUSE='${asset.FUND_HOUSE}', PORTFOLIO='${asset.PORTFOLIO}', `
    sql += `START_DATE='${asset.START_DATE}', END_DATE='${asset.END_DATE}', `
    sql += `STATUS='${asset.STATUS}' WHERE ID = '${asset.ID}'`

    return execute(sql)
}

export function setDirty(assetId) {
    const sql = `UPDATE ASSET SET DIRTY='T' WHERE ID = '${assetId}'`
    return execute(sql)
}

export function getAsset(assetId) {
    let sql = ''
    sql += 'SELECT ID, NAME, CATEGORY, INSTRUMENT, HOLDER, INSTITUTION, FUND_HOUSE, PORTFOLIO, STATUS, CURRENT, '
    sql += 'DATE_FORMAT(START_DATE, "%Y-%m-%d") AS START_DATE, DATE_FORMAT(END_DATE, "%Y-%m-%d") AS END_DATE, '
    sql += 'ROI, DATEDIFF(END_DATE, START_DATE) AS DAYS FROM ASSET WHERE '
    sql += `ID = '${assetId}'`

    return execute(sql)
}


export function getAssets(assetFilter) {
    let sql = ''
    sql += 'SELECT ID, NAME, CATEGORY, INSTRUMENT, HOLDER, INSTITUTION, CURRENT, ROI '
    sql += 'FROM ASSET WHERE '    
    sql += `STATUS = '${assetFilter['status']}' `  

    if(assetFilter['portfolio'] !== 'ALL')     sql += `AND PORTFOLIO LIKE '%${assetFilter['portfolio']}%' `      
    if(assetFilter['category'] !== 'ALL')      sql += `AND CATEGORY = '${assetFilter['category']}' ` 
    if(assetFilter['instrument'] !== 'ALL')    sql += `AND INSTRUMENT = '${assetFilter['instrument']}' `
    if(assetFilter['holder'] !== 'ALL')        sql += `AND HOLDER = '${assetFilter['holder']}' ` 
    if(assetFilter['institution'] !== 'ALL')  sql += `AND INSTITUTION = '${assetFilter['institution']}' ` 

    return execute(sql)
}

function execute(sql) {
    return new Promise((resolve, reject) => {
        const con = getConnection()
        con.query(sql, (error, results) => {
            if (error) reject(error)
            resolve(results)
            con.end()
        })
    })
}