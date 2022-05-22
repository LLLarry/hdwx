import ajax from '../ajax'
// const baseUrl = process.env.NODE_ENV === 'production' ? '' : '/api'
/**
 * 获取查询商户设备列表
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
export const getDeviceInfoList = (data, loadText) => {
  return ajax({
    url: '/mobileMerchant/getDeviceInfoList',
    method: 'post',
    data,
    loadText
  })
}

/** ==============
 * 获取设备系统参数
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
export const readsysteminfo = (data, loadText) => {
  return ajax({
    url: '/readsysteminfo',
    method: 'post',
    data,
    loadText
  })
}

/** ==============
 * 获取商户下相同类型的设备
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
//  export const searchDeviceData = (data, loadText) => {
//     return ajax({
//         url: '/equipment/searchDeviceData',
//         method: 'post',
//         data,
//         loadText
//     })
// }

/** ==============
 * 保存系统参数
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
export const setSysParam = (params, loadText) => {
  return ajax({
    url: '/equipment/setSysParam',
    method: 'get',
    params,
    loadText
  })
}

/** ==============
 * 设备订单数据
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
export const inquireDeviceOrderData = (data, loadText) => {
  return ajax({
    url: '/mobileMerchant/inquireDeviceOrderData',
    method: 'post',
    data,
    loadText
  })
}

// /** ==============
//  * 查询端口状态
//  * @param {*} data
//  * @param {*} loadText
//  * @returns
//  */
//  export const querystate = (data, loadText) => {
//     return ajax({
//         url: '/querystate',
//         method: 'post',
//         data,
//         loadText
//     })
// }

/*
  通过设备号查询设备信息
* @param {*} data
* @param {*} loadText
* @returns
*/
export const inquireDeviceMmanageInfo = (data, loadText) => {
  return ajax({
    url: '/mobileMerchant/inquireDeviceMmanageInfo',
    method: 'post',
    data,
    loadText
  })
}

/*
 * 设备状态查看
 * @param {*} data { code: 设备号， addr?: 从机地址 }
 * @param {*} loadText
 * @returns
 */
export const inquireDeviceStatus = (data, loadText) => {
  return ajax({
    url: '/mobileMerchant/inquireDeviceStatus',
    method: 'post',
    data,
    loadText
  })
}

/*
 * 更新端口状态（设备）
 * @param {*} data { code: 设备号， port: 端口 }
 * @param {*} loadText
 * @returns
 */
export const querystate = (data, loadText) => {
  return ajax({
    url: '/queryPortStatus',
    method: 'post',
    data,
    loadText
  })
}

/*
 * 更新端口状态（从机）
 * @param {*} data { code: 设备号， port: 端口， addr: 从机地址 }
 * @param {*} loadText
 * @returns
 */
export const queryPortStatus = (data, loadText) => {
  return ajax({
    url: '/wolfNewSendData/queryPortStatus',
    method: 'post',
    data,
    loadText
  })
}

/*
 * 锁定端口状态（设备）
 * @param {*} data { code: 设备号， port: 端口 }
 * @param {*} loadText
 * @returns
 */
export const lock = (data, loadText) => {
  return ajax({
    url: '/lock',
    method: 'post',
    data,
    loadText
  })
}

/*
 * 锁定端口状态（从机）
 * @param {*} data { code: 设备号， port: 端口， addr: 从机地址 }
 * @param {*} loadText
 * @returns
 */
export const lockOrUnlockPort = (data, loadText) => {
  return ajax({
    url: '/wolfNewSendData/lockOrUnlockPort',
    method: 'post',
    data,
    loadText
  })
}

/*
 * 远程充电（设备）
 * @param {*} data { code: 设备号， port: 端口 }
 * @param {*} loadText
 * @returns
 */
export const testpaytoport = (data, loadText) => {
  return ajax({
    url: '/testpaytoport',
    method: 'post',
    data,
    loadText
  })
}

/*
 * 远程充电（从机）
 * @param {*} data { code: 设备号， port: 端口， addr: 从机地址 }
 * @param {*} loadText
 * @returns
 */
export const startCharge = (data, loadText) => {
  return ajax({
    url: '/wolfNewSendData/startCharge',
    method: 'post',
    data,
    loadText
  })
}

/*
 * 远程断电（设备）
 * @param {*} data { code: 设备号， port: 端口 }
 * @param {*} loadText
 * @returns
 */
export const stopRechargeByPort = (data, loadText) => {
  return ajax({
    url: '/stopRechargeByPort',
    method: 'post',
    data,
    loadText
  })
}

/*
 * 远程断电（从机）
 * @param {*} data { code: 设备号， port: 端口， addr: 从机地址 }
 * @param {*} loadText
 * @returns
 */
export const stopCharge = (data, loadText) => {
  return ajax({
    url: '/wolfNewSendData/stopCharge',
    method: 'post',
    data,
    loadText
  })
}

/*
 * 更新设备报警状态
 * @param {*} data { code: 设备号， type: 温度1 烟感2 总功率3 }
 * @param {*} loadText
 * @returns
 */
export const getDeviceNowArgument = (data, loadText) => {
  return ajax({
    url: '/getDeviceNowArgument',
    method: 'post',
    data,
    loadText
  })
}

/*
 * 更新IMEI号
 * @param {*} data { code1: 旧设备号，code2: 新设备号 }
 * @param {*} loadText
 * @returns
 */
export const merTranspositionImei = (data, loadText) => {
  return ajax({
    url: '/mobileMerchant/merTranspositionImei',
    method: 'post',
    data,
    loadText
  })
}

/*
 * 设备断开重连
 * @param {*} data { code: 设备号 }
 * @param {*} loadText
 * @returns
 */
export const removeClient = (data, loadText) => {
  return ajax({
    url: '/mobileMerchant/removeClient',
    method: 'post',
    data,
    loadText
  })
}

/*
 * 更改设备的硬件版本号 、设备名称、所属小区
 * @param {*} data { code: 设备号， hardversion?: 硬件版本号， devicename?: aid?: 小区id  }
 * @param {*} loadText
 * @returns
 */
export const updateDeviceInfoByCode = (data, loadText) => {
  return ajax({
    url: '/mobileMerchant/updateDeviceInfoByCode',
    method: 'post',
    data,
    loadText
  })
}

/*
 * 获取商户名下的小区列表
 * @param {*} data {  }
 * @param {*} loadText
 * @returns
 */
export const getDealAreaListInfo = (data, loadText) => {
  return ajax({
    url: '/mobileMerchant/getDealAreaListInfo',
    method: 'post',
    data,
    loadText
  })
}

/*
 * 解绑小区
 * @param {*} data { code： 设备号 }
 * @param {*} loadText
 * @returns
 */
export const dealUnbindDevice = (data, loadText) => {
  return ajax({
    url: '/mobileMerchant/dealUnbindDevice',
    method: 'post',
    data,
    loadText
  })
}

/*
 * 获取系统参数信息
 * @param {*} data { code： 设备号 }
 * @param {*} loadText
 * @returns
 */
export const getDeviceSystemParam = (data, loadText) => {
  return ajax({
    url: '/mobileMerchant/getDeviceSystemParam',
    method: 'post',
    data,
    loadText
  })
}

/*
 * 获取商户名下同类型设备
 * @param {*} data { hwVerson：硬件版本号 }
 * @param {*} loadText
 * @returns
 */
export const searchDeviceData = (data, loadText) => {
  return ajax({
    url: '/mobileMerchant/searchDeviceData',
    method: 'post',
    data,
    loadText
  })
}

/*
 * 汽车桩获取系统参数
 * @param {*} data { hwVerson：硬件版本号 }
 * @param {*} loadText
 * @returns
 */
export const wolfreadsys = (params, loadText) => {
  return ajax({
    url: '/wolfreadsys',
    method: 'get',
    params,
    loadText
  })
}

/*
 * 汽车桩设置系统参数
 * @param {*} data { hwVerson：硬件版本号 }
 * @param {*} loadText
 * @returns
 */
export const wolfsetsys = (params, loadText) => {
  return ajax({
    url: '/wolfsetsys',
    method: 'get',
    params,
    loadText
  })
}

/*
 * 获取报警系统阈值
 * @param {*} data { code：设备号， type: 1 温度 2 烟感 3 总功率 }
 * @param {*} loadText
 * @returns
 */
export const getDeviceSetArgument = (params, loadText) => {
  return ajax({
    url: '/getDeviceSetArgument',
    method: 'get',
    params,
    loadText
  })
}

/*
 * 设置报警系统阈值
 * @param {*} data { code：设备号， type: 1 温度 2 烟感 3 总功率, value：设置的值 }
 * @param {*} loadText
 * @returns
 */
export const setDeviceArgument = (params, loadText) => {
  return ajax({
    url: '/setDeviceArgument',
    method: 'get',
    params,
    loadText
  })
}

/*
 * 获取最新的信道值
 * @param {*} data { code：设备号 }
 * @param {*} loadText
 * @returns
 */
export const inquireChannelinfo = (data, loadText) => {
  return ajax({
    url: '/wolfNewSendData/inquireChannelinfo',
    method: 'post',
    data,
    loadText
  })
}

/*
 * 设置信道值
 * @param {*} data { code：设备号， channelnum： 设置的信道值  如432 }
 * @param {*} loadText
 * @returns
 */
export const setChannelinfo = (data, loadText) => {
  return ajax({
    url: '/wolfNewSendData/setChannelinfo',
    method: 'post',
    data,
    loadText
  })
}

/*
 * 初始化加载上次设置的信道值
 * @param {*} data { code：设备号， channelnum： 设置的信道值  如432 }
 * @param {*} loadText
 * @returns
 */
export const inquireChannelvaleLogData = (params, loadText) => {
  return ajax({
    url: '/mobileMerchant/inquireChannelvaleLogData',
    method: 'get',
    params,
    loadText
  })
}

/*
 * 查询设备统计信息
 * @param {*} data { code：设备号 }
 * @param {*} loadText
 * @returns
 */
export const inquireDeviceIncomeInfo = (params, loadText) => {
  return ajax({
    url: '/mobileMerchant/inquireDeviceIncomeInfo',
    method: 'get',
    params,
    loadText
  })
}

/*
 * 获取报警页面数据库中的数据
 * @param {*} data { code：设备号 }
 * @param {*} loadText
 * @returns
 */
export const inquireWarnHot = (params, loadText) => {
  return ajax({
    url: '/mobileMerchant/inquireWarnHot',
    method: 'get',
    params,
    loadText
  })
}

/*
 * 设备获取下发远程充电
 * @param {*} data { code：设备号 }
 * @param {*} loadText
 * @returns
 */
export const remotechargechoose = (params, loadText) => {
  return ajax({
    url: '/mobileMerchant/remotechargechoose',
    method: 'get',
    params,
    loadText
  })
}

/*
 * 设备下发远程充电
 * @param {*} data { code 是 设备号 portchoose 是 选择的端口号 tempsonid 是 子模版id addr  丛机号 }
 * @param {*} loadText
 * @returns
 */
export const remotechargeaccess = (data, loadText) => {
  return ajax({
    url: '/mobileMerchant/remotechargeaccess',
    method: 'post',
    data,
    loadText
  })
}

/*
 * 设备管理丛机列表
 * @param {*} data { code 是 设备号 }
 * @param {*} loadText
 * @returns
 */
export const inquireDeviceAddr = (data, loadText) => {
  return ajax({
    url: '/mobileMerchant/inquireDeviceAddr',
    method: 'post',
    data,
    loadText
  })
}

/*
 * 丛机—添加或删除丛机号
 * @param {*} data { code 是 设备号 type 是 类型  addr  丛机号 }
 * @param {*} loadText
 * @returns
 */
export const addOrRemoveAddr = (data, loadText) => {
  return ajax({
    url: '/wolfNewSendData/addOrRemoveAddr',
    method: 'post',
    data,
    loadText
  })
}

/*
 * 更新（查询）丛机号
 * @param {*} data { code 是 设备号 }
 * @param {*} loadText
 * @returns
 */
export const queryAllAddr = (data, loadText) => {
  return ajax({
    url: '/queryAllAddr',
    method: 'post',
    data,
    loadText
  })
}

/*
 * 查询同类型的设备列表
 * @param {*} data { code 是 设备号 }
 * @param {*} loadText
 * @returns
 */
export const inquireTheSameDeviceData = (data, loadText) => {
  return ajax({
    url: '/mobileMerchant/inquireTheSameDeviceData',
    method: 'post',
    data,
    loadText
  })
}

/**
 * 更新一拖二设备端口状态
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
export const queryAddrAllPortStatus = (data, loadText) => {
  return ajax({
    url: '/wolfNewSendData/queryAddrAllPortStatus',
    data,
    method: 'post',
    loadText
  })
}

/**
 * 更新端口状态
 * @param {*} data {  code: String }
 * @param {*} loadText
 * @returns
 */
export const portstate1 = (data, loadText) => {
  return ajax({
    url: '/portstate1',
    data,
    method: 'post',
    loadText
  })
}

/**
 * 脉冲远程充电
 * @param {*} data {  code: String }
 * @param {*} loadText
 * @returns
 */
export const remoteChargingIncoins = (data, loadText) => {
  return ajax({
    url: '/mobileMerchant/remoteChargingIncoins',
    data,
    method: 'post',
    loadText
  })
}

/**
 * 获取离线卡信息
 * @param {*} data {  code: String， openid, nowtime }
 * @param {*} loadText
 * @returns
 */
export const queryOfflineCard = (data, loadText) => {
  return ajax({
    url: '/allowInterface/queryOfflineCard',
    data,
    method: 'post',
    loadText
  })
}

/**
 * 充值离线卡
 * @param {*} data {}
 * @param {*} loadText
 * @returns
 */
export const chargeCard = (data, loadText) => {
  return ajax({
    url: '/chargeCard',
    data,
    method: 'post',
    loadText
  })
}
