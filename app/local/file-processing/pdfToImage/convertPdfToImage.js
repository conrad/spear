var PDFImage = require("pdf-image").PDFImage;
const fs = require('fs')
 
console.log('starting')
const filepath = __dirname + '/../../../../test/fixtures/lorem-ipsum.pdf'
var pdfImage = new PDFImage(filepath)

pdfImage.numberOfPages().then((number) => {
  console.log(number)
})

pdfImage.convertFile().then((imagePaths) => {
  // [ /tmp/slide-0.png, /tmp/slide-1.png ]
  console.log('something here')
})

pdfImage.convertFile()
  .then(() => {
    console.log('come on')
  })
  .catch(err => {
    console.log('error:', err)
  })

pdfImage.convertPage(0).then(function (imagePath) {
  console.log('in here')
  // 0-th page (first page) of the slide.pdf is available as slide-0.png
  fs.existsSync("/tmp/lorem-ipsum.png") // => true
  console.log('done')
});