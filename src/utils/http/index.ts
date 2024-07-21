import { Response } from "@/api/types"
import {
  ALLOWED_RESOLVE_CODES,
  ContentTypeEnum,
  LOGIN_CODES,
  ResultHeaderEnum,
} from "@/enums/requestEnum"
import { useAuthStore } from "@/store"
import Axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse
} from "axios"
import { merge } from "lodash-es"

// 默认 axios 实例请求配置
const configDefault: AxiosRequestConfig = {
  headers: {
    "Content-Type": ContentTypeEnum.JSON
  },
  timeout: 5000,
  baseURL: import.meta.env.VITE_API_URL
}

const isDebug = import.meta.env.VITE_DEBUG

class Http {
  // 当前实例
  private static axiosInstance: AxiosInstance
  // 请求配置
  private static axiosConfigDefault: AxiosRequestConfig

  // 请求拦截
  private httpInterceptorsRequest(): void {
    Http.axiosInstance.interceptors.request.use(
      config => {
        const authStore = useAuthStore()

        let token = authStore.token
        // 发送请求前，可在此携带 token
        if (token) {
          console.log("getToken", token)
          config.headers[ResultHeaderEnum.TOKEN_KEY] = token
        }
        return config
      },
      (error: AxiosError) => {
        console.log("request", error)
        return Promise.reject(error)
      }
    )
  }

  // 响应拦截
  private httpInterceptorsResponse(): void {
    Http.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        const authStore = useAuthStore()
        // 与后端协定的返回字段
        const { message, payload } = response.data || {}
        // 判断请求是否成功
        if (ALLOWED_RESOLVE_CODES.includes(message?.code)) {
          return response
        } else {
          if (LOGIN_CODES.includes(message.code)) {
            // 跳转到授权页
            console.warn("登录超时 / 鉴权失败")

          }
          // 处理请求错误
          // showFailToast(message);
          return Promise.reject(response)
        }
      },
      (error: AxiosError) => {
        console.log("response", error)
        // 处理 HTTP 网络错误
        let message = ""
        // HTTP 状态码
        const status = error.response?.status
        console.log("status", status)
        switch (status) {
          case 400:
            message = "请求错误"
            break
          case 401:
            message = "未授权，请登录"
            break
          case 403:
            message = "拒绝访问"
            break
          case 404:
            message = `请求地址出错: ${error.response?.config?.url}`
            break
          case 408:
            message = "请求超时"
            break
          case 500:
            message = "服务器内部错误"
            break
          case 501:
            message = "服务未实现"
            break
          case 502:
            message = "网关错误"
            break
          case 503:
            message = "服务不可用"
            break
          case 504:
            message = "网关超时"
            break
          case 505:
            message = "HTTP版本不受支持"
            break
          default:
            message = "网络连接故障"
        }
        return Promise.reject(error)
      }
    )
  }

  constructor(config: AxiosRequestConfig) {
    Http.axiosConfigDefault = config
    Http.axiosInstance = Axios.create(config)
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }

  // 通用请求函数
  public request<T>(
    paramConfig: AxiosRequestConfig
  ): Promise<Response<T>> {
    const config = merge({}, Http.axiosConfigDefault, paramConfig)
    return new Promise((resolve, reject) => {
      Http.axiosInstance
        .request(config)
        .then((response: AxiosResponse) => {
          const token = response.headers[ResultHeaderEnum.TOKEN_KEY]
          // 如果有token返回
          if (token) {
            return resolve({ ...response.data, token: token })
          }
          resolve(response.data)
        })
        .catch((response: AxiosResponse) => {
          reject(response.data)
        })
    })
  }
}

export default new Http(configDefault)
