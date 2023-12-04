export default () => {
  return {
    name: 'return-partial',
    transform(code, path) {
      const reg = /^[\w\W]+\/src\/views\/.*\.vue$/
      if (reg.test(path)) {
        // console.log('path', path)
        const codeRes = code.replace(
          'defineExpose({',
          `defineExpose({
            originCode: "${encodeURIComponent(code)}",
          `
        )
        return codeRes
      }
    },
  }
}
