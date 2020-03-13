const { Router } = require("express")
const axios = require("axios")

const routes = Router()

routes.get("/", (req, res) => {
    return res.json({ message: 'Semana Omnistack!' })
})

routes.post("/devs", async (req, res) => {
    const { github_username } = req.body

    const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)

    const {name = login, bio, avatar_url} = apiResponse.data

    
})

module.exports = routes