interface UseLocalStorageArgs {
  expire: number
}

const useLocalStorage = (args: UseLocalStorageArgs = { expire: 120000 }) => {
  const set = (key: string, value: any) => {
    localStorage.setItem(
      key,
      JSON.stringify({
        value: value,
        expire: Date.now() + args.expire
      })
    )
  }
  const get = (key: string) => {
    const _value = localStorage.getItem(key)
    if(!_value) {
        return null
    }
    const { expire, value } = JSON.parse(_value)
    if (Date.now() > expire) {
      remove(key)
      return null
    }
    return value
  }

  const remove = (key: string) => {
    localStorage.removeItem(key)
  }

  return { set, get, remove }
}

export default useLocalStorage
