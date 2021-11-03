import Qs from 'qs'
import axios from 'axios'
import { fmtDate } from '@/utils/util'
import store from '@/store'
const LOGGER_URL = 'http://www.tengfuchong.com.cn'
const env = window.HDWX.ENV

export default () => {
    const { id, username, realname } = store.state.user
    const error = `
    -------【hdwx-访问信息start】-------
    访问时间： ${fmtDate(new Date())}
    商户信息： ${JSON.stringify({ id, username, realname })}
    浏览器信息：${window.navigator.userAgent}
    -------【hdwx-访问信息end】-------
    `
    if (env === 'production') {
        axios.post(`${LOGGER_URL}/logger/revice`, Qs.stringify({ error }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
    }
}
