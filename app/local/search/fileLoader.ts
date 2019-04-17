import * as fs from 'fs'
import * as readline from 'readline'
import { THRESHOLD_FILE_SIZE } from '../../constants'
const extract = require('pdf-text-extract')

export default class FileLoader {
  public load(file: File): string  {
    console.log('loading...')
    if (!fs.existsSync(file.path)) {
      throw new Error('File doesn\'t exist.')
    }

    if (file.size > THRESHOLD_FILE_SIZE) {
      console.log(`File may be too large to load all at once: ${file.size}`)
    }
  
    if (file.type === 'application/pdf') {
      return this.loadPdf(file)
    }

    return fs.readFileSync(file.path, 'utf8')
  }

  public loadPdf(file: File): string {
    console.log('loading 2')
    let fileContents: string = ''
    // TODO: Does this work?
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

  public readFileByStream(file: File): readline.ReadLine {
    return readline.createInterface({
      input: fs.createReadStream(file.path)
    })
  }
}
