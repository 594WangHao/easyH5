module.exports = {
    port: 3000,
    DBUri: 'mongodb://localhost/easyH5',
    session: {
        secret: 'easyH5',
        // cookie: {
        //     maxAge: 1000 * 60 * 60 * 24 * 7
        // },
        saveUninitialized: false,
        resave: false
    }
}