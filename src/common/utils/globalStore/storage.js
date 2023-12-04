export function getStorage(key) {
  const data = localStorage.getItem(key)
  let result = null
  if (data) {
    try {
      result = JSON.parse(data)
    } catch (e) {
      result = data
    }
  }
  return result
}

export function setStorage(key, value) {
  if (value instanceof Object || value instanceof Array) {
    localStorage.setItem(key, JSON.stringify(value))
  } else {
    localStorage.setItem(key, value)
  }
}

export function clearStorage(key) {
  localStorage.removeItem(key)
}
