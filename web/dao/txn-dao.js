import getConnection from './db'

export function createTxn(txn) {
    const { ASSET_ID, DATE, CATEGORY, TIMELINE, UNIT, VALUE, AMOUNT, COMMENTS, STATUS } = txn
    let sql = ''
    sql += 'INSERT INTO TXN (ASSET_ID, DATE, CATEGORY, TIMELINE, UNIT, VALUE, AMOUNT, COMMENTS, STATUS) VALUES ('
    sql += `'${ASSET_ID}', '${DATE}', '${CATEGORY}', '${TIMELINE}', '${UNIT}', '${VALUE}', '${AMOUNT}', `
    sql += `'${COMMENTS}', '${STATUS}')`

    return execute(sql)
}

export function updateTxn(txn) {
    const { ID, DATE, CATEGORY, TIMELINE, UNIT, VALUE, AMOUNT, COMMENTS, STATUS } = txn
    let sql = ''
    sql += 'UPDATE TXN SET '
    sql += `DATE='${DATE}', CATEGORY='${CATEGORY}', TIMELINE='${TIMELINE}', UNIT='${UNIT}', VALUE='${VALUE}', `
    sql += `AMOUNT='${AMOUNT}', COMMENTS='${COMMENTS}', STATUS='${STATUS}' WHERE ID = '${ID}'`

    return execute(sql)
}


export function getTxn(txnId) {
    let sql = ''
    sql += 'SELECT ID, ASSET_ID, DATE_FORMAT(DATE, "%Y-%m-%d") AS DATE, CATEGORY, TIMELINE, UNIT, VALUE, '
    sql += 'ROUND(UNIT*VALUE, 2) AS TOTAL, AMOUNT, COMMENTS, STATUS '
    sql += `FROM TXN WHERE ID = '${txnId}'`

    return execute(sql)
}


export function getTxns(txnFilter) {
    console.log(txnFilter)
    const { ASSET_ID, YEAR, MONTH, CATEGORY, TIMELINE, STATUS } = txnFilter
    let sql = ''
    sql += 'SELECT ID, ASSET_ID, DATE_FORMAT(DATE, \'%Y-%m-%d\') AS DATE, COMMENTS, CATEGORY, TIMELINE, '
    sql += 'UNIT, VALUE, AMOUNT, STATUS '
    sql += `FROM TXN WHERE ASSET_ID = '${ASSET_ID}' `    
    
    if(YEAR !== 'ALL' && MONTH === 'ALL') sql += `AND DATE LIKE '%${YEAR}%' `
    if(YEAR !== 'ALL' && MONTH !== 'ALL') sql += `AND DATE LIKE '%${YEAR}-${MONTH}%' `


    if(CATEGORY !== 'ALL')  sql += `AND CATEGORY = '${CATEGORY}' ` 
    if(TIMELINE !== 'ALL')  sql += `AND TIMELINE = '${TIMELINE}' ` 
    if(STATUS !== 'ALL')    sql += `AND STATUS = '${STATUS}' ` 

    sql += 'ORDER BY DATE DESC'
    console.log(sql)
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