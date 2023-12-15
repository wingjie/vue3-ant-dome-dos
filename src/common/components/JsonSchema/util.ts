/* eslint-disable no-prototype-builtins */
import { JSONSchemaFaker } from 'json-schema-faker'

interface JSONSchema {
  type: string
  description?: string
  properties?: Record<string, JSONSchema>
  items?: JSONSchema
  required?: string[]
}

export function renamePropertyAndKeepKeyPrecedence(
  obj: any,
  [oldKey, newKey]: any[]
) {
  const descriptors = Object.getOwnPropertyDescriptors(obj)
  if (Object.prototype.hasOwnProperty.call(descriptors, oldKey)) {
    Object.entries(descriptors).reduce((target, [key, descriptor]) => {
      Reflect.deleteProperty(target, key)
      if (key === oldKey) {
        key = newKey
      }
      Reflect.defineProperty(target, key, descriptor)
      return target
    }, obj)
  }
  return obj
}

function convertSchemaToData(schema: JSONSchema): any {
  let data: any = {}
  if (schema.type?.includes('boolean')) {
    data = randomBoolean()
  } else if (schema.type === 'null') {
    data = null
  } else if (schema.type?.includes('number')) {
    data = randomNumber()
  } else if (schema.type?.includes('string')) {
    data = randomString()
  } else if (schema.type?.includes('array')) {
    data = []
  }

  function processProperties(
    properties: { [key: string]: JSONSchema },
    parentData: any
  ) {
    for (const key in properties) {
      if (properties.hasOwnProperty(key)) {
        const prop = properties[key]
        if (prop.hasOwnProperty('type')) {
          if (prop.type?.includes('object')) {
            parentData[key] = {}
            if (prop.hasOwnProperty('properties')) {
              processProperties(
                prop.properties as { [key: string]: JSONSchema },
                parentData[key]
              )
            }
          } else if (prop.type?.includes('array')) {
            parentData[key] = [convertSchemaToData(prop.items as JSONSchema)]
          } else if (prop.type?.includes('number')) {
            parentData[key] = randomNumber()
          } else if (prop.type === 'null') {
            parentData[key] = null
          } else if (prop.type?.includes('string')) {
            parentData[key] = randomString()
          } else if (prop.type?.includes('boolean')) {
            parentData[key] = randomBoolean()
          }
        }
      }
    }
  }
  if (schema.properties && !schema.items) {
    processProperties(schema.properties, data)
  } else if (!schema.properties && schema.items) {
    data = [convertSchemaToData(schema.items as JSONSchema)]
  }

  return data
}

// 随机生成一串字符串内容
export function randomString() {
  return JSONSchemaFaker.generate({
    type: 'string',
  })
}
// 随机生成一个数字
export function randomNumber() {
  return JSONSchemaFaker.generate({
    type: 'number',
  })
}
// 随机生成一个布尔值
export function randomBoolean() {
  return JSONSchemaFaker.generate({
    type: 'boolean',
  })
}

export function jsonSchemaToJSON(schema: JSONSchema) {
  const data = convertSchemaToData(schema)
  return JSON.stringify(data, null, 2)
}
