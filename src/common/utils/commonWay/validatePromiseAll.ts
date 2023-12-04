async function validate(
  arr: any,
  fn?: (arg0: boolean, arg1?: any[] | undefined) => void
) {
  const arrP = arr.map((item: { value: { validate: () => any } }) =>
    item?.value?.validate()
  )
  return new Promise((resolve) => {
    Promise.all(arrP)
      .then((res) => {
        let bools = true
        res.forEach((item) => {
          if (item && item.status === false) {
            bools = false
          }
        })
        if (!bools) {
          resolve(false)
          if (fn) {
            fn(false, res)
          }
        } else {
          resolve(true)
          if (fn) {
            fn(true, res)
          }
        }
      })
      .catch(() => {
        resolve(false)
        if (fn) {
          fn(false)
        }
      })
  })
}
export default validate
