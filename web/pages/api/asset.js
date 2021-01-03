import createConnection from '../../utils/db'

export default (req, res) => {
    switch (req.method) {
        case 'POST': return createAsset(req, res)
    }

    res.status(405).end()
}

function createAsset(req, res) {
    const asset = req.body

    const CREATE_ASSET = `INSERT INTO ASSET (
        CODE, NAME, CATEGORY, INSTRUMENT, HOLDER, 
        INSTITUTION, FUND_HOUSE, START_DATE, END_DATE, STATUS) VALUES (
        '${asset.code}', '${asset.name}', '${asset.category}', '${asset.instrument}', '${asset.holder}',
        '${asset.institution}', '${asset.fundHouse}', '${asset.startDate}', '${asset.endDate}', 
        '${asset.status}')`

    const con = createConnection()
    con.query(CREATE_ASSET);
    con.end();

    res.status(200).end()
}