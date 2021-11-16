
/**
 * 创建子模板
 * @param {*} childTempList 子模板列表
 * @param {*} handler 处理函数
 * @returns 新创建的子模板记录
 */
export const createChildTemp = (childTempList = [], handler = () => {}) => {
    // 取子模板的最后一条记录
    const lastItem = childTempList[childTempList.length - 1]
    return handler(lastItem)
}
