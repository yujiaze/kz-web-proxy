import * as winston from 'winston'
import settings from '../conf/config'

let logger = new (winston.Logger)({ exitOnError: false })

logger.level = settings.LOG_LEVEL

if (process.env.NODE_ENV == 'production') {
    winston.configure({
        transports: [
            new (winston.transports.File)({ filename: process.cwd() + '/var/vote.log' })
        ]
    })
}

export default logger