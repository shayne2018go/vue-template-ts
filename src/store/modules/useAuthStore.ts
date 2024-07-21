import { defineStore } from "pinia"
import { ref } from "vue"

const isDebug = import.meta.env.VITE_DEBUG

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string>("")
  const isLogin = ref<boolean>(false)

  return {
    token,
    isLogin,
  }
})
