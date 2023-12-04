import { message } from 'ant-design-vue'
import * as XLSXInstance from 'xlsx'

function readFile(file: any, callback: Function) {
  const reader = new FileReader()
  reader.onload = (e: any) => {
    const data = e.target.result
    callback(data)
  }
  reader.readAsBinaryString(file)
}

export function readExcel(file: any) {
  return new Promise((resolve, reject) => {
    const { type } = file
    if (
      type !==
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      reject(message.error('文件格式错误'))
    }
    readFile(file, (fileData: any) => {
      const workbook = XLSXInstance.read(fileData, { type: 'binary' })
      const result: any = []
      console.log(workbook, 'workbook')
      workbook.SheetNames.forEach((sheetName: string) => {
        result.push({
          sheetName,
          sheet: XLSXInstance.utils.sheet_to_json(workbook.Sheets[sheetName], {
            raw: true,
            defval: '',
          }),
        })
      })
      console.log(result, 'result')
      if (result[0].sheet.length > 0) {
        resolve(result)
      } else {
        reject(message.error('文件为空'))
      }
    })
  })
}

export function exportExcel(sourceData: any, fileName = 'example.xlsx') {
  const { sheets, columns } = sourceData
  const sheetName = 'sheet1'
  const SheetNames: any = [sheetName]
  const Sheets: any = {
    [sheetName]: XLSXInstance.utils.json_to_sheet(sheets, {
      header: columns,
    }),
  }
  const workbook = { SheetNames, Sheets }
  console.log('exportExcel:workbook', workbook)
  return XLSXInstance.writeFile(workbook, fileName, { type: 'binary' })
}
