const express = require("express")
const server = express()
const { Client } = require("@notionhq/client")
const notion = new Client({ auth: "secret_CiM1CjeI1gIoLUrCAMfRpQJj5JM5xXP3HqMhddNqjzP" })

// generate static folder under ./public
server.use(express.static("public"))

// router
server.get("/timer", async function (request, response) {
  let data = await notion.databases.query({ database_id: "c13c55c93d084c7fa1250e11d6dbec60" })
  data = data.results.map(i => i.properties)
  data = data.map(i => {
    return {
      h: i.ColorH.number,
      id: i.Id.title[0].plain_text,
      l: i.ColorL.number,
      s: i.ColorS.number,
      seconds: i.Seconds.number,
    }
  })
  response.json(data)
})

server.listen(8080)