const mysql = require('mysql')

export default function createConnection() {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'asset_manager'
    })

    return connection
}