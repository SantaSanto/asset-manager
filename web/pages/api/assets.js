import { createAsset, getAssets } from '../../dao/asset-dao'

export default (req, res) => {
    switch (req.method) {
        case 'GET': return onGet(req, res)
    }

    res.status(405).end()
}

async function onGet(req, res) {
    const assetFilter = {}
    assetFilter['PORTFOLIO'] = req.query['PORTFOLIO']
    assetFilter['CATEGORY'] = req.query['CATEGORY']
    assetFilter['INSTRUMENT'] = req.query['INSTRUMENT']
    assetFilter['HOLDER'] = req.query['HOLDER']
    assetFilter['INSTITUTION'] = req.query['INSTITUTION']
    assetFilter['STATUS'] = req.query['STATUS']
    assetFilter['SORT_BY'] = req.query['SORT_BY']
    assetFilter['SORT_ORDER'] = req.query['SORT_ORDER']

    try {
        const assets = await getAssets(assetFilter)
        res.status(200).json(assets)
    } catch(error) {
        console.log(error)
        res.status(500).end()
    }   
}