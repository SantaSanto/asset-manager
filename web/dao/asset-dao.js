import getConnection from './db'

export function createAsset(asset) {
    let sql = ''
    sql += 'INSERT INTO ASSET (CODE, NAME, CATEGORY, INSTRUMENT, '
    sql += 'HOLDER, INSTITUTION, FUND_HOUSE, PORTFOLIO, START_DATE, END_DATE, STATUS) VALUES ('
    sql += `'${asset.code}', '${asset.name}', '${asset.category}', '${asset.instrument}', ` 
    sql += `'${asset.holder}', '${asset.institution}', '${asset.fundHouse}', '${asset.portfolio}', `
    sql += `'${asset.startDate}', '${asset.endDate}', '${asset.status}')`

    return new Promise((resolve, reject) => {
        const con = getConnection()
        con.query(sql, (error, results) => {
            if (error) reject(error)
            resolve(results)
            con.end()
        })
    })
}

export function getAssets(assetFilter) {
    console.log(assetFilter)
    let sql = ''
    sql += 'SELECT CODE, NAME, CATEGORY, INSTRUMENT, HOLDER, INSTITUTION '
    sql += 'FROM ASSET WHERE '    
    sql += `STATUS = '${assetFilter['status']}' `  

    if(assetFilter['holder'] !== 'ALL') {
        sql += `AND HOLDER = '${assetFilter['holder']}' `   
    }
    console.log(sql)
    
    return new Promise((resolve, reject) => {
        const con = getConnection()
        con.query(sql, (error, results) => {
            if (error) reject(error)
            resolve(results)
            con.end()
        })
    })
}