import * as fs from 'fs'
const extract = require('pdf-text-extract')

export default class FileLoader {
  load(file: File): string  {  // This and related methods should be pulled out to another object. 
    if (file.type === 'application/pdf') {
      return this.loadPdf(file)
    }

    return this.loadTxt(file)
  }

  loadPdf(file: File): string {
    let fileContents: string = ''
    extract(file.path, { splitPages: false }, function (err: any, text: string) {
      if (err) {
        console.dir(err)
        return
      }
      console.dir('success:', text)
      fileContents = text
    })

    return fileContents
  }

  loadTxt(file: File) {
    if (fs.existsSync(file.path)) {
      return fs.readFileSync(file.path, 'utf8')
    } else {
      throw new Error('File doesn\'t exist.')
    }
  }
}