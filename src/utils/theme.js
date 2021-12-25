// import formula from '@/constant/formula.json'
import color from 'css-color-function'
import rgbHex from 'rgb-hex'
import axios from 'axios'

const whiteFormula = {
  black: 'color(primary shade(100%))',
  white: 'color(primary shade(0%))',
  'gray-1': 'color(primary shade(10%))',
  'gray-2': 'color(primary shade(20%))',
  'gray-3': 'color(primary shade(30%))',
  'gray-4': 'color(primary shade(40%))',
  'gray-5': 'color(primary shade(50%))',
  'gray-6': 'color(primary shade(60%))',
  'gray-7': 'color(primary shade(70%))',
  'gray-8': 'color(primary shade(80%))'
}

const darkFormula = {
  black: 'color(primary tint(100%))',
  white: 'color(primary tint(0%))',
  'gray-1': 'color(primary tint(10%))',
  'gray-2': 'color(primary tint(20%))',
  'gray-3': 'color(primary tint(30%))',
  'gray-4': 'color(primary tint(40%))',
  'gray-5': 'color(primary tint(50%))',
  'gray-6': 'color(primary tint(60%))',
  'gray-7': 'color(primary tint(70%))',
  'gray-8': 'color(primary tint(80%))'
}
export const writeStyle = cssText => {
  const style = document.createElement('style')
  style.className = 'reset-style'
  const oldStyle = document.querySelector(style.className)
  style.innerHTML = cssText
  document.head.appendChild(style)
  if (oldStyle) {
    oldStyle.remove()
  }
}
/**
 * 根据主题色，生成最新的样式表
 * @param {*} primaryColor 主题色
 */
export const generateNewStyle = async primaryColor => {
  // 1、根据主题色生成色值表
  const colors = generateColors(primaryColor)
  // 2、获取当前element-plus的默认样式表，并把需要进行替换的色值打上标记
  let cssText = await getOriginalStyle()
  // 3、遍历生成的色值表，在默认样式表进行全局替换
  Object.entries(colors).forEach(([key, value]) => {
    cssText = cssText.replace(new RegExp('(:|\\s+)' + key, 'g'), (match, p1) => {
      return p1 + value
    })
  })
  cssText = rgbaReverseColor(cssText)
  return cssText
}

/**
 * 通过parimary主题色和色值表，生成主题色的色值表
 * @param {*} parimary 主题色
 * @returns 主题色的色值表,如：
 * {
    "shade-1": "#f632de",
    "light-1": "#63dea5",
    ...
  }
 */
const generateColors = primary => {
  if (!primary) return
  const formula = primary === '#000000' ? darkFormula : whiteFormula
  const colors = {
  }
  Object.entries(formula).forEach(([key, value]) => {
    // 替换之后的函数，如："color(#ff0000 tint(50%))"
    const value1 = value.replace(/primary/g, primary)
    // 将上面的函数转化为 rgba颜色，如：rgb(255, 128, 128)"
    const rgbaColor = color.convert(value1)
    // 将rgba颜色转化为16进制颜色
    const hexColor = '#' + rgbHex(rgbaColor)
    colors[key] = hexColor
  })
  return colors
}

/**
 * 从远程获取要修改的库的默认默认样式
 * @returns 打完标记的默认库的样式
 */
const getOriginalStyle = async () => {
  const version = require('vant/package.json').version
  const url = `https://cdn.jsdelivr.net/npm/vant@${version}/lib/index.css`
  const { data } = await axios.get(url)
  return getStyleTemplate(data)
}

/**
 * 获取打完标记的默认库的样式
 * @param {*} data 要修改的库的默认默认样式
 * @returns 打完标记的默认库的样式
 */
const getStyleTemplate = data => {
  // element-plus 默认色
  const colorMap = {
    '#000': 'black',
    '#fff': 'white',
    '#f7f8fa': 'gray-1',
    '#f2f3f5': 'gray-2',
    '#ebedf0': 'gray-3',
    '#dcdee0': 'gray-4',
    '#c8c9cc': 'gray-5',
    '#969799': 'gray-6',
    '#646566': 'gray-7',
    '#323233': 'gray-8'
  }
  const matchStr = Object.keys(colorMap).map(key => `(${key})`).join('|')
  return data.replace(new RegExp(matchStr, 'ig'), (match) => {
    return colorMap[match]
  })
}

export function reverseColor (color) {
  if (!color.includes('#')) {
    color = rgbHex(color)
  }
  color = color.toUpperCase()
  const list = []
  color.replace(/(\d|A|B|C|D|E|F){2}/g, (match) => {
    list.push(Number.parseInt(match, 16))
  })
  const reverseList = list.map(item => 255 - item)
  const hColor = `rgb(${reverseList.join(',')})`
  return rgbHex(hColor)
}

/**
 * 反转rgba
 * @param {*} cssText css文本
 */
function rgbaReverseColor (cssText) {
  const parseRgbaReg = /rgba\((\d+)\s{0,},(\d+)\s{0,},(\d+)\s{0,},(0?\.?\d?)\)/g
  return cssText.replace(parseRgbaReg, (match, r, g, b, a, d) => {
    return `rgba(${255 - r}, ${255 - g}, ${255 - b}, ${a})`
  })
}
