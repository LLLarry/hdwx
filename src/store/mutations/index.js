// mutations
import { getType } from '@/utils/util'
export default {
    setGlobalData (state, globalData) {
        if (getType(globalData) !== 'object') throw new TypeError('globalData is not Object')
        state.global = { ...state.global, ...globalData }
        sessionStorage.setItem('state', JSON.stringify(state))
    }
}
