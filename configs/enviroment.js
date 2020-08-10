const env = process.env.NODE_ENV || "dev"

const configs = {
    dev: {
        jwt_secret: "",
        mongodb_uri: "",
        port: 3000,
    },
    staging: {
        jwt_secret: process.env.JWT_SECRET,
        mongodb_uri: process.env.MONGODB_URI,
        port: process.env.PORT,
    },
    production: {
        jwt_secret: process.env.JWT_SECRET,
        mongodb_uri: process.env.MONGODB_URI,
        port: process.env.PORT,
    },
}

Object.entries(configs).forEach(([env, arr]) => (arr.env = env))

const config = configs[env]
if (!config) throw new Error(`NODE_ENV \`${env}\` NOT CONFIGURED!`)

const badProperty = Object.entries(config).find(([key, value]) => value === undefined)
if (badProperty) throw new Error(`NODE_ENV \`${env}\` KEY \`${badProperty[0]}\` is undefined! Please configure it!`)

module.exports = config
