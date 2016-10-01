module.exports = {
    port: 3000,
    uri: 'mongodb://localhost/easyH5',
    routes: [{
            url: '/',
            name: 'index.js'
        },
        // {
        //     url: '/api',
        //     name: 'api.js'
        // },
        // {
        //     url: '/about',
        //     name: 'about.js'
        // }
    ],
    session: {
        secret: 'easyH5',
        // cookie: {
        //     maxAge: 1000 * 60 * 60 * 24 * 7
        // },
        saveUninitialized: false,
        resave: false
    }
}