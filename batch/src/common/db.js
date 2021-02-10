const mysql = require('mysql')

function getConnection() {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'asset_manager'
    })

    return con
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

module.exports = {
    execute
}