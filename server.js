var mysql = require('mysql')
const express = require('express')
const https = require('axios')
const { default: axios } = require('axios')

const app = express()
const port = 53134

app.post('/auth', (req, res) => {
    if (req.query.username) {
        
    }
})

app.get('/roblox', (req, res) => {
    if (req.query.id){
        
        // notify the user to post something in their roblox profile description
        res.send(401)
    }
})

app.get('/discord', (req, res) => {
    if (req.query.code) {
        const token = req.query.code
    
        // Get user info using token
        console.log("Discord token receieved: " + token)
        res.sendStatus(200)

        // Look for user name and id by using the fetched token
        axios.get("https://discordapp.com/api/v9/users/@me", {headers: {Authorization: `Bearer ${token}`}}).then(function(response){
            console.log(JSON.parse(response).username)
        })

        // Save the user name and id to the database
    }
})

app.post('/setstatus', (req, res) => {
    if (req.query.username && req.query.placeid && req.query.jobid) {
        
    }
})

app.post('/status', (req, res) => {
    if (req.query.username) {
        
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})