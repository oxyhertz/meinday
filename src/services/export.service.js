import { read, writeFileXLSX } from 'xlsx'

/* load the codepage support library for extended support with older formats  */
import { set_cptable } from 'xlsx'
import * as cptable from 'xlsx/dist/cpexcel.full.mjs'
set_cptable(cptable)

export const exportSerivce = {}

function exportExcel(data, fileName) {
  const workbook = new Excel.Workbook()
  const worksheet = workbook.addWorksheet('Sheet1')
  worksheet.columns = data.columns
  worksheet.rows = data.rows
  worksheet.getCell('A1').value = data.title
  worksheet.getCell('A2').value = data.description
  worksheet.getCell('A3').value = data.author
  worksheet.getCell('A4').value = data.date
  worksheet.getCell('A5').value = data.url
  worksheet.getCell('A6').value = data.keywords
  worksheet.getCell('A7').value = data.license
  worksheet.getCell('A8').value = data.license_url
  worksheet.getCell('A9').value = data.version
  worksheet.getCell('A10').value = data.author_email
  worksheet.getCell('A11').value = data.author_url
}
