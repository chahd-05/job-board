const express = require("express")
const db = require("./config/db")

const app = express()

const port = 3000

app.get("/", (req, res) => {
    res.send("hello from here")
})

app.listen(port, () => {
    console.log(`server is renning on: http://localhost:${port}`)
})

app.get("/offres", async(req, res) => {
    const [rows] = await db.execute("SELECT * FROM offre")
    res.json(rows)
})