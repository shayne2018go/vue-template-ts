const useWaitAsyncFunc = <T extends (...args: any[]) => void>(
  asyncFn: T,
  delay = 300
) => {
  let flag = false

  return function (...fncArgs: Parameters<typeof asyncFn>) {
    let context = this

    if (flag) return
    flag = true

    return new Promise<ReturnType<typeof asyncFn>>((resolve, reject) => {
      asyncFn
        .apply(context, fncArgs)
        .then(resolve)
        .catch(reject)
        .finally(() => {
          setTimeout(() => {
            flag = false
          }, delay)
        })
    })
  }
}

export default useWaitAsyncFunc
