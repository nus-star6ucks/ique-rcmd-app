import axios from "axios"
import nProgress from "nprogress"
import "nprogress/nprogress.css"

const requests = axios.create({
    timeout: 5000
})

requests.interceptors.request.use((config) => {
    nProgress.start()
    return config
})

requests.interceptors.response.use((res) => {
    nProgress.done()
    return res.data
}, () => {
    return Promise.reject(new Error('fail'))
})

export default requests