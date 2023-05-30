require('dotenv').config()
module.exports = {
    apps: [{
        name: `RDC API - ${process.env.PORT}`,
        script: 'npm start',
        args: 'one two',
        instances: `${process.env.PM2_INSTANCES}`,
        watch: true,
        ignore_watch: [
            'node_modules',
            'logs',
            'src/public'
        ]
    }]
}
