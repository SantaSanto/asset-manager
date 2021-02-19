import getConnection from './db'

export function getCashflows(filter) {
    const { PORTFOLIO, HOLDER, INSTITUTION, CATEGORY, YEAR } = filter
    let sql = ''
    
    sql += `SELECT DATE_FORMAT(DATE, "%Y-%m-%d") AS DATE, SUM(T.AMOUNT) AS AMOUNT `
    sql += `FROM TXN T LEFT JOIN ASSET A ON T.ASSET_ID = A.ID `
    sql += `WHERE T.TIMELINE = 'E' `

    if(PORTFOLIO !== 'ALL') sql += `AND A.PORTFOLIO LIKE '%${PORTFOLIO}%' `
    if(HOLDER !== 'ALL') sql += `AND A.HOLDER = '${HOLDER}' `
    if(INSTITUTION !== 'ALL') sql += `AND A.INSTITUTION = '${INSTITUTION}' `

    sql += `AND T.CATEGORY = '${CATEGORY}' `
    sql += `AND T.DATE LIKE '%${YEAR}%' `
    sql += `GROUP BY T.DATE ORDER BY DATE ASC`

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