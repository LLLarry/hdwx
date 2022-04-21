import { initState } from '../../store/state'
import { HDWX_STATE } from '../../store/mutations'
sessionStorage.setItem(HDWX_STATE, JSON.stringify(initState))
