import * as request from 'request'

const to_proxy_url = url => {
    if ('http://dev.kuaizhan.com'.match(/:\/\/dev\.kuaizhan/)) {
        return url.replace(/dev/, 'www')
    }
    return url
}

const create_opt = ctx => {
    const default_opt = {
        headers: {
            ...ctx.request.headers,
            Host: 'www.kuaizhan.com',
            Referer: "http://www.kuaizhan.com/"

        },
        encoding: null, //for image return as Buffer
        timeout: 8000,
        jar: true
    }
    return {
        ...default_opt,
        body: parse_body(ctx),
        method: ctx.request.method
    }
}




const parse_body = ctx => {
    var body = ctx.request.body;
    if (body === undefined || body === null) {
        return undefined;
    }
    var contentType = ctx.request.header['content-type'];
    if (!Buffer.isBuffer(body) && typeof body !== 'string') {
        if (contentType && contentType.indexOf('json') !== -1) {
            body = JSON.stringify(body);
        } else {
            body = body + '';
        }
    }
    return body;
}


export const request_promise = (url, opt?) => new Promise(
    (resolve, reject) => {
        console.log(url, opt.method)
        request(
            url,
            opt,
            (err, response, body) => (!err && response.statusCode == 200) ? resolve(response) : reject(err)
        )
    }
)

export default function* (next) {
    var result = yield request_promise(to_proxy_url(this.request.href), create_opt(this))
    this.body = result.body
    this.type = result.headers['content-type']
    yield next
}