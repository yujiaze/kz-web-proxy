import * as Koa from 'koa'
import * as httpProxy from 'http-proxy'
import logger  from './lib/logger'

var app = new Koa()

var port

process.argv && process.argv.forEach(
    argv => {
        let result = argv.match(/--port=.*/g)
        if (result && result[0]) {
            port = parseInt(result[0].replace(/--port=/g, ''))
        }
    }
)

if (!port) {
    logger.error('port must presents')
    process.exit()
}

import proxyMiddleware from './middleware/request'
import timeoutMiddleware from './middleware/timeout'
import * as bodyParserMiddleware from 'koa-bodyparser'

app.use(function* (next) {
    yield next
})

app.use(bodyParserMiddleware({
    formLimit: '1mb' //page save payload too large 413
}))

app.use(timeoutMiddleware)

app.use(proxyMiddleware)

app.listen(port)

