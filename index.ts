import * as Koa from 'koa'
import * as httpProxy from 'http-proxy'


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
    console.error('port must presents')
    process.exit()
}

import proxyMiddleware from './middleware/request'

app.use(function* (next){
    yield next
})

app.use(proxyMiddleware)

app.listen(port)

