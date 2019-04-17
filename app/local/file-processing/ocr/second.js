const Tesseract = require('tesseract.js');
const pdfToPng = require('pdf-to-png')

console.log('dirname:', __dirname)
const pdfFilePath = __dirname + '/../../../../test/fixtures/lorem-ipsum.pdf'
const outputFile = __dirname + '/../../../../test/fixtures/lorem-ipsum.png'

pdfToPng({
  input: pdfFilePath,
  output: outputFile
}, () => {
  console.log('in here')
  Tesseract.recognize(outputFile)
  .progress(function(packet){
    console.info(packet)
    })
  .then(function(result){
    console.log(result.text)
  })
  .catch(function(err){
    console.log(err)
  })
})
