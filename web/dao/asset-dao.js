import getConnection from './db'

export function createAsset(asset) {
    let sql = ''
    sql += 'INSERT INTO ASSET (CODE, NAME, CATEGORY, INSTRUMENT '
    sql += 'HOLDER, INSTITUTION, FUND_HOUSE, START_DATE, END_DATE, STATUS) VALUES ('
    sql += `'${asset.code}', '${asset.name}', '${asset.category}', '${asset.instrument}' ` 
    sql += `'${asset.holder}', '${asset.institution}', '${asset.fundHouse}', '${asset.startDate}', ` 
    sql += `'${asset.endDate}', '${asset.status}')`
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

export function getAssets(filter) {

    let sql = ''
    sql += 'SELECT CODE, NAME, CATEGORY, INSTRUMENT, HOLDER, INSTITUTION '
    sql += 'FROM ASSET '
    
    // if(filter['group'] !== 'ALL') {
    //     sql += 'group ='    
    // }

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