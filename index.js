const express = require("express")

const app = express()

app.listen(3000, function () {
    console.log("iniciando novos padrões de api")
})

app.get("/", function (req, res) {
    return res.send("iniciando uma api")
})
