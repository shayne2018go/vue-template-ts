import Layout from "@/layout/index.vue"
import type { RouteRecordRaw } from "vue-router"
import Demo from "@/views/demo/index.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    redirect: { name: "Home" },
    component: () => import("@/layout/index"),
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页",
          requireAuth: true
        }
      }
    ]
  }
]

export default routes
