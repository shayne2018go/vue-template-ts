// 非空
export const EMPTY_REGEX = /[\s\S]/

// 手机号
export const PHONE_REGEX = /^1[3456789]\d{9}$/

// 中、英文、数字 (允许中间有空格)
export const TEXT_REGEX = /^[0-9a-zA-Z\u4e00-\u9fa5\uff21-\uff3a\uff41-\uff5a]+(\s*[0-9a-zA-Z\u4e00-\u9fa5\uff21-\uff3a\uff41-\uff5a])*$/

export const EMOJI_REGEX = /^(?!(.*[\uD800-\uDFFF\u2600-\u26FF\u2700-\u27BF\uD83C\uD83D\uD83E].*)).*$/
// 纯数字
export const NUMBER_REGEX = /^[0-9]*$/

// 纯数字加空格
export const NUMBER_SPACE_REGEX = /^[0-9 ]+$/

// 手机号
export const CODE_REGEX = /^[0123456789]\d{5}$/

// 详细地址长度
export const ADDRESS_LENGTH_REGEX = /^.{5,}$/

// 详细地址内容（中英文+数字）
export const ADDRESS_TEXT_REGEX = /^[-（）—() _#.a-zA-Z0-9\u4e00-\u9fa5]+$/

// 验证码
export const QRCODE_REGEX = /^[0-9]{4}$/

// 中文空格
export const CHINESE_REGEX = /^[\u4e00-\u9fa5\u0020]+/

// 英文数字空格
export const ENGLISH_REGEX = /^[0-9a-zA-Z\u0020]+/

// 双字节字符
export const DOUBLE_CHAR_REGEX = /[\x00-\xff]/