const axios = require('axios')
const Dev = require('../models/Dev')
const parseAsString = require('../utils/parseStringAsArray')
const { findConnections, sendMessage} = require('../websocket')

module.exports = {

    async index(req, res) {
        const devs = await Dev.find()

        return res.json(devs)
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body

        let dev = await Dev.findOne({ github_username })
    
        if(!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
    
            const {name = login, bio, avatar_url} = apiResponse.data
        
            const techsArray = parseAsString(techs)
        
            const location = {
                type: 'Point',
                coordinates: [latitude, longitude]
            }
        
            dev = await Dev.create({
                github_username,
                name,
                bio,
                avatar_url,
                techs: techsArray,
                location
            })

            // filtro de conexões

            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev)
        
        }
        
        return res.json(dev)
    }
}