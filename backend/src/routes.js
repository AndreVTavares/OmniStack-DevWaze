const { Router } = require("express")
const axios = require("axios")
const Dev = require("./models/Dev")

const routes = Router()

routes.get("/", (req, res) => {
    return res.json({ message: 'Semana Omnistack!' })
})

routes.post("/devs", async (req, res) => {
    const { github_username, techs, latitude, longitude } = req.body

    const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)

    const {name = login, bio, avatar_url} = apiResponse.data

    const techsArray = techs.split(',').map(tech => tech.trim())

    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    const dev = await Dev.create({
        github_username,
        name,
        bio,
        avatar_url,
        techs: techsArray,
        location
    })

    return res.json(dev)
    
})

module.exports = routes