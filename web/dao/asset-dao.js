import getConnection from './db'

export function createAsset(asset) {
    
    return new Promise( (resolve, reject) => {

        const CREATE_ASSET = `INSERT INTO ASSET (
          CODE, NAME, CATEGORY, INSTRUMENT, HOLDER, 
          INSTITUTION, FUND_HOUSE, START_DATE, END_DATE, STATUS) VALUES (
            '${asset.code}', '${asset.name}', '${asset.category}', '${asset.instrument}',
            '${asset.holder}', '${asset.institution}', '${asset.fundHouse}', '${asset.startDate}',
            '${asset.endDate}', '${asset.status}')`

        const con = createConnection()
        con.query(CREATE_ASSET, (error, results) => {
            if (error) reject(error)

            resolve(results)
            con.end()
        })
    })
}

export function getAssets() {

    return new Promise( (resolve, reject) => {

        const ASSETS = `SELECT CODE, NAME, CATEGORY, INSTRUMENT, HOLDER, INSTITUTION FROM ASSET`

        const con = getConnection()
        con.query(ASSETS, (error, results) => {
            if (error) reject(error)

            resolve(results)
            con.end()
        }) 
    })
}