const mysql = require('mysql')

export default function getConnection() {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'asset_manager'
    })

    return con
}