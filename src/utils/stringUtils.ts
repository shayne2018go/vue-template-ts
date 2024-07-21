import { CHINESE_REGEX, ENGLISH_REGEX } from "./regexUtils"

// 是否为全英文
export const isAlphabet = (val: string) => {
  return /^[a-zA-Z]+$/.test(val)
}

// 是否为全中文
export const isChinese = (val: string) => {
  return /^[\u4e00-\u9fa5]+$/.test(val)
}

// 是否包含英文和数字
export const isIncludeAlphabet = (val: string) => {
  return /[a-zA-Z0-9]+/.test(val)
}
