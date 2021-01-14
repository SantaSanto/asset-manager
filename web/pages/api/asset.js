import { createAsset, updateAsset } from '../../dao/asset-dao'

export default (req, res) => {
    switch (req.method) {
        case 'POST': return onPost(req, res)
        case 'PUT': return onPut(req, res)
    }

    res.status(405).end()
}


async function onPost(req, res) {
    const asset = req.body

    try {
        await createAsset(asset)
        res.status(200).end()
    } catch(error) {
        console.log(error)
        res.status(500).end()
    }   
}

async function onPut(req, res) {
    const asset = req.body

    try {
        await updateAsset(asset)
        res.status(200).end()
    } catch(error) {
        console.log(error)
        res.status(500).end()
    }   
}