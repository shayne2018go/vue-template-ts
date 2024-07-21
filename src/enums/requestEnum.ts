/**
 * @description: ContentType
 */
export enum ContentTypeEnum {
  // form-data qs
  FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8",
  // form-data upload
  FORM_DATA = "multipart/form-data;charset=UTF-8",
  // json
  JSON = "application/json;charset=UTF-8"
}

/**
 * @description: 与后端协定的状态 code
 */
export enum ResultEnum {
  SUCCESS = 200,
  ERROR = 500, // 失败
  LOGIN_TIMEOUT = 401, // 登录超时
}

export enum ResultHeaderEnum {
  TOKEN_KEY = "Authentication"
}

export const ALLOWED_RESOLVE_CODES = [ResultEnum.SUCCESS]

export const LOGIN_CODES = [ResultEnum.LOGIN_TIMEOUT]
