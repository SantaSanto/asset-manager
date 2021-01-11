import { createAsset, getAssets } from '../../dao/asset-dao'

export default (req, res) => {
    switch (req.method) {
        case 'GET': return onGET(req, res)
    }

    res.status(405).end()
}

async function onGET(req, res) {
    const filter = {}
    filter['group'] = req.query['group']
    filter['category'] = req.query['category']
    filter['instrument'] = req.query['instrument']
    filter['holder'] = req.query['holder']
    filter['institution'] = req.query['institution']
    filter['status'] = req.query['status']

    try {
        const assets = await getAssets(filter)
        res.status(200).json(assets)
    } catch(error) {
        console.log(error)
        res.status(500).end()
    }   
}