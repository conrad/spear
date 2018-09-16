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


//////////////////////////////////
// STREAM OPTIONS / ATTEMPTS
//////////////////////////////////

  // loadFileByStream(file: File) {    // async?
  //   return new Promise(resolve => {
  //     let header
  //     const label = `read2-${file}`
  //     console.time(label)
  //     const stream = fs.createReadStream(file.name, {encoding: 'utf8'})
  //     stream.on('data', data => {
  //       header = data.split(/\n/)[0]
  //       stream.destroy()
  //     })
  //     stream.on('close', () => {
  //       console.timeEnd(label)
  //       resolve()
  //     })
  //   })
  // }


// loadTxt(file: File) {

//   this.loadFileByStream(file)

//   var lineReader = readline.createInterface({
//     input: fs.createReadStream('file.in')  // ???
//   })
  
//   lineReader.on('line', function (line) {
//     console.log('Line from file:', line);
//     // TODO: Do the searchin'!!!
//   })
// }


// const instream = fs.createReadStream('your/file')
// const outstream = new stream()
// const rl = readline.createInterface(instream, outstream)

// rl.on('line', function(line) {
//   // process line here
// })

// rl.on('close', function() {
//   // do something on finish here
// })

