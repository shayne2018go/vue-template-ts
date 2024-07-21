import { useAuthStore } from "@/store"
import {
  createRouter,
  createWebHashHistory,
  type RouteLocationNormalized
} from "vue-router"
import routes from "./routes"

const router = createRouter({
  history: createWebHashHistory("/"),
  routes
})

export interface toRouteType extends RouteLocationNormalized {
  meta: {
    title?: string
    noCache?: boolean
    requireAuth?: boolean
  }
}

export const parseQuery = function (r?: string, t?: string) {
  let n
  const i = {} as any
  return (
    (r = r || location.search.substring(1)),
    (t = t || "&"),
    (n = r.split(t)),
    n.forEach(function (r) {
      if ("" !== r) {
        const n = r.split("=")
        i[n[0]] = n[1]
      }
    }),
    i
  )
}

export const addQuery = function (key: string, value: string) {
  const query = parseQuery()
  query[key] = value
  const search = `?${Object.keys(query)
    .map(key => `${key}=${query[key]}`)
    .join("&")}`
  const url = `${location.origin}${location.pathname}${search}${location.hash}`
  return url
}

router.beforeEach((to: toRouteType, from, next) => {
  setPageTitle(to.meta.title)
  next()
})

router.afterEach(() => {})

export default router

const setPageTitle = (routerTitle?: string) => {
  window.document.title = routerTitle ? `${routerTitle}` : `默认标题`
}
