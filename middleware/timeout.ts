var co = require('co').default

export default function* (next) {
    let timeout
    yield Promise.race([
        new Promise((resolve, reject) => {
            co(function* () {
                yield next
            }).then(() => {
                clearTimeout(timeout)
                resolve()
            }, e => console.log(e))
        }),
        new Promise((resolve, reject) => {
            timeout = setTimeout(() => {
                this.status = 408
                this.body = 'request timeout'
                reject(new Error('request timeout'))
            }, 10000)
        }),
    ])
}