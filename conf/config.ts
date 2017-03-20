const config = {
    base: {
        LOG_LEVEL: 'debug'
    },
    dev: {

    },
    test: {

    },
    production: {

    }
}


var env = process.env.NODE_ENV || 'dev'

export default Object.assign({}, config['base'], config[env])