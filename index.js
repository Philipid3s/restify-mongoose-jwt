const restify = require('restify');
const mongoose = require('mongoose');
const config = require('config');
const rjwt = require('restify-jwt-community');

const server = restify.createServer();

// middleware
server.use(restify.plugins.bodyParser());

// Protect routes
server.use(rjwt({ secret: config.jwt.secret }).unless( { path: ['/auth']}));

server.listen(config.server.port, () => {
    mongoose.set('useFindAndModify', false);
    mongoose.connect(config.db.mongo_uri, 
        { useNewUrlParser: true});
});

const db = mongoose.connection;

db.on('error', (err) => console.log(err));

db.once('open', () => {
    require('./routes/customers')(server);
    require('./routes/users')(server);
    console.log(`Server started on port ${config.server.port}`);
});