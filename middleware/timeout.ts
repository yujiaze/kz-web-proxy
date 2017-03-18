export default function* (next) {
    setTimeout(()=> {
        this.response.status = '408'
    }, 8000)
    yield next
}