// @ts-ignore
import { join } from 'path'
// @ts-ignore
import { writeFileSync } from 'fs'

export default function setChildAppPlugin(env: any) {
  let basePath = ''
  if (env.VITE_ENV === 'prod') {
    return
  }

  return {
    name: 'vite:micro-venus',
    apply: 'build',
    configResolved(config: any) {
      basePath = `${config.base}${config.build.assetsDir}/`
    },
    writeBundle(options: any, bundle: any) {
      for (const chunkName in bundle) {
        if (Object.prototype.hasOwnProperty.call(bundle, chunkName)) {
          const chunk = bundle[chunkName]
          if (chunk.fileName && chunk.fileName.endsWith('.js')) {
            // @ts-ignore
            chunk.code = chunk.code.replace(
              /(from|import\()(\s*['"])(\.\.?\/)/g,
              // eslint-disable-next-line no-loop-func
              (all: any, $1: any, $2: any, $3: any) => {
                return all.replace($3, new URL($3, basePath))
              }
            )
            // @ts-ignore
            const fullPath = join(options.dir, chunk.fileName)
            // @ts-ignore
            writeFileSync(fullPath, chunk.code)
          }
        }
      }
    },
  }
}
