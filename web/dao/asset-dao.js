import getConnection from './db'

export function getAssets() {

    return new Promise( (resolve, reject) => {
        const connection = getConnection()

        connection.query('SELECT CODE, NAME, CATEGORY, INSTRUMENT, HOLDER, INSTITUTION FROM ASSET',
            (error, results) => {
                if (error) reject(error)
                resolve(results)
                console.log('Connection - Closed')
                connection.end()
            }
        ) 
    })
}