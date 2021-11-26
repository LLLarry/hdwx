import ajax from '../ajax'
/**
 * pc端获取系统模板
 * @param {*} data
 * @param {*} loadText
 * @returns
 */
export const getSystemTempData = (data, loadText) => {
    return ajax({
        url: '/deviceData/getSystemTempData',
        method: 'get',
        data,
        loadText
    })
}

/**
 * 查询模板详情
 * @param {*} data { tempid: 主模板id version：硬件版本号 merid?: 商户id 不传从缓存中获取id }
 * @param {*} loadText
 * @returns
 */
export const inquireDeviceTemlata = (params, loadText) => {
    return ajax({
        url: '/mobileMerchant/inquireDeviceSysTemlata',
        method: 'get',
        params,
        loadText
    })
}

/**
 * 查询主模板通过v3
 * @param {*} data { tempid: 主模板id }
 * @param {*} loadText
 * @returns
 */
 export const inquireTemplateV3 = (params, loadText) => {
    return ajax({
        url: '/mobileMerchant/inquireTemplateV3',
        method: 'get',
        params,
        loadText
    })
}

/**
 * 插入子模板v3
 * @param {*} data {  }
 * @param {*} loadText
 * @returns
 */
 export const insertSonTempV3 = (params, loadText) => {
    return ajax({
        url: '/mobileMerchant/insertSonTempV3',
        method: 'get',
        params,
        loadText
    })
}

/**
 * 删除子模板
 * @param {*} data { id 删除的子模板id }
 * @param {*} loadText
 * @returns
 */
 export const deleteSonTemp = (params, loadText) => {
    return ajax({
        url: '/mobileMerchant/deleteSonTemp',
        method: 'get',
        params,
        loadText
    })
}

/**
 * 修改v3主模板
 * @param {*} data { id 删除的子模板id }
 * @param {*} loadText
 * @returns
 */
 export const amendTempV3 = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/amendTempV3',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 添加v3主模板
 * @param {*} data { id 删除的子模板id }
 * @param {*} loadText
 * @returns
 */
 export const insertTempV3 = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/insertTempV3',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 通过设备号查询模板信息
 * @param {*} data { code 设备号 }
 * @param {*} loadText
 * @returns
 */
 export const inquireDeviceTemlataData = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/inquireDeviceTemlataData',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 预览模板
 * @param {*} data { code 设备号 tempid 模板id}
 * @param {*} loadText
 * @returns
 */
 export const deviceTemplatePreview = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/deviceTemplatePreview',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 模板复用 [更新多个设备使用的模板信息]
 * @param {*} data { deviceList 设备号数组 tempid 模板id}
 * @param {*} loadText
 * @returns
 */
 export const updateDeviceTemplate = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/updateDeviceTemplate',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 更新指定设备的模板信息
 * @param {*} data { code 设备号 tempid 模板id}
 * @param {*} loadText
 * @returns
 */
 export const updateSingleDeviceTemplate = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/updateSingleDeviceTemplate',
        method: 'post',
        data,
        loadText
    })
}

/**
 * 通过模板id删除指定模板
 * @param {*} data { id 模板id}
 * @param {*} loadText
 * @returns
 */
 export const deleteTemlataById = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/deleteTemlataById',
        method: 'post',
        data,
        loadText
    })
}

/*
* 点击编辑[查看]获取充电模板
* @param {*} data { tempid 是 主模板id }
* @param {*} loadText
* @returns
*/
export const inquireTemplateCharge = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/inquireTemplateCharge',
        method: 'post',
        data,
        loadText
    })
}

/*
* 获取充电系统模板 根据 版本号 查询系统模板信息(包含子类模板)
* @param {*} data { version 是 硬件版本号 }
* @param {*} loadText
* @returns
*/
export const inquireDeviceSysTemlata = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/inquireDeviceSysTemlata',
        method: 'post',
        data,
        loadText
    })
}

/*
* 添加充电子模板啊v2
* @param {*} data { sonname 是 子模板名, parentid 是 父类模板id, paymoney 是 付款金额, chargeTime 是 充电时间, chargeQuantity 是 充电电量 }
* @param {*} loadText
* @returns
*/
export const insertSonTempCharge = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/insertSonTempCharge',
        method: 'post',
        data,
        loadText
    })
}

/*
* 修改充电模板v2
* @param {*} data { paratem: JSON数据 }
* @param {*} loadText
* @returns
*/
export const amendTempCharge = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/amendTempCharge',
        method: 'post',
        data,
        loadText
    })
}

/*
* 获取充电说明信息 v2
* @param {*} data { code: 设备号, tempid: 主模板id }
* @param {*} loadText
* @returns
*/
export const editTemplateHintInfo = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/editTemplateHintInfo',
        method: 'post',
        data,
        loadText
    })
}

/*
* 新增充电说明信息 v2
* @param {*} data { paratem: JSON数据 }
* @param {*} loadText
* @returns
*/
export const insertTempCharge = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/insertTempCharge',
        method: 'post',
        data,
        loadText
    })
}

/*
* 删除正在使用此模板的设备 v2
* @param {*} data { paratem: JSON数据 }
* @param {*} loadText
* @returns
*/
export const removeSingleDeviceTemplate = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/removeSingleDeviceTemplate',
        method: 'post',
        data,
        loadText
    })
}

/*
* 保存汽车桩模板 car
* @param {*} data { paratem: JSON数据 }
* @param {*} loadText
* @returns
*/
export const amendTemplateCard = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/amendTemplateCard',
        method: 'post',
        data,
        loadText
    })
}

/*
* 新增汽车桩模板 car
* @param {*} data { paratem: JSON数据 }
* @param {*} loadText
* @returns
*/
export const insertTemplateCard = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/insertTemplateCard',
        method: 'post',
        data,
        loadText
    })
}

/*
* 添加汽车桩子模板 car
* @param {*} data { }
* @param {*} loadText
* @returns
*/
export const insertSonTempCard = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/insertSonTempCard',
        method: 'post',
        data,
        loadText
    })
}

/*
* 新增投币主模板 pulse
* @param {*} data { paratem: JSON数据 }
* @param {*} loadText
* @returns
*/
export const insertTempIncoins = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/insertTempIncoins',
        method: 'post',
        data,
        loadText
    })
}

/*
* 保存/修改投币主模板 pulse
* @param {*} data { paratem: JSON数据 }
* @param {*} loadText
* @returns
*/
export const amendTempIncoins = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/amendTempIncoins',
        method: 'post',
        data,
        loadText
    })
}

/*
* 添加脉冲子模板 pulse
* @param {*} data { sonname: 子模板名字， parentid: 父类模板id， paymoney: 付款金额， incoinsnum: 投币数 }
* @param {*} loadText
* @returns
*/
export const insertSonTempIncoins = (data, loadText) => {
    return ajax({
        url: '/mobileMerchant/insertSonTempIncoins',
        method: 'post',
        data,
        loadText
    })
}
