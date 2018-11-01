const pkg = require('../package');

module.exports = {
    app: {
        name: pkg.name,
        version: pkg.version,
        env: process.env.NODE_ENV || 'development'
    },
    server: {
        port:  process.env.PORT,
        url: process.env.BASE_URL,
    },
    db: {
        mongo_uri: process.env.MONGO_URI,
    },

    jwt: {
        secret: process.env.JWT_SECRET,
    }
};