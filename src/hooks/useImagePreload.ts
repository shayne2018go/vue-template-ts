import { ref } from "vue"

const imgPreloader = (url: string) => {
  return new Promise<void>((resolve, reject) => {
    let image = new Image()
    image.src = url
    image.onload = () => {
      resolve()
    }
    image.onerror = () => {
      reject()
    }
  })
}
export const imgsPreloader = (imgs: string[]) => {
  let promiseArr = []
  imgs.forEach(element => {
    promiseArr.push(imgPreloader(element))
  })
  return Promise.allSettled(promiseArr)
}

export default function useImagePreloader(urls: string[]) {
  const loading = ref(true)
  imgsPreloader(urls)
    .then(res => {})
    .finally(() => {
      loading.value = false
    })

  return { loading }
}
