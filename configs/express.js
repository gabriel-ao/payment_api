"use strict"
const Express = require("express"),
    Helmet = require("helmet"),
    BodyParser = require("body-parser"),
    Multer = require("multer"),
    Cors = require("cors"),
    Morgan = require("morgan"),

const port = require("./environment").port,
    routes = require("../routes")

module.exports = () => {
    const app = Express()

    app.use(
        Cors({
            origin: "*",
        })
    )
    app.use(Helmet())
    app.use(Helmet.hidePoweredBy({ setTo: "PHP 5.5.14" }))
    app.use(Helmet.xssFilter())
    app.use(Helmet.noSniff())
    app.use(Helmet.frameguard())

    app.use(BodyParser.urlencoded({ extended: true }))
    app.use(BodyParser.json({limit: '10mb'}))
    app.use(Multer({ storage: Multer.memoryStorage() }).any())
    app.use(Morgan("tiny"))

    app.set("views", "./views")
    app.set("view engine", "ejs")

    routes.forEach(route => route(app))
    app.use((err, req, res, next) => (err.name === "UnauthorizedError" ? res.status(401).send({ error: "Sem autorização!" }) : next()))
    app.get("*", function (req, res) {
        res.status(404).send({ error: "not found" })
    })

    app.set("port", port || 3000);
    return app
}

