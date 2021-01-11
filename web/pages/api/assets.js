import { createAsset, getAssets } from '../../dao/asset-dao'

export default (req, res) => {
    switch (req.method) {
        case 'GET': return onGET(req, res)
    }

    res.status(405).end()
}

async function onGET(req, res) {
    const assetFilter = {}
    assetFilter['portfolio'] = req.query['portfolio']
    assetFilter['category'] = req.query['category']
    assetFilter['instrument'] = req.query['instrument']
    assetFilter['holder'] = req.query['holder']
    assetFilter['institution'] = req.query['institution']
    assetFilter['status'] = req.query['status']

    try {
        const assets = await getAssets(assetFilter)
        res.status(200).json(assets)
    } catch(error) {
        console.log(error)
        res.status(500).end()
    }   
}