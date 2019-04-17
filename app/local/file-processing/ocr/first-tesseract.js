const Tesseract = require('tesseract.js');
const PDFImage = require("pdf-image").PDFImage;
const fs = require('fs')

console.log('dirname:', __dirname)
const pdfPath = __dirname + '/../../../../test/fixtures/gettysburg-address.pdf'

var pdfImage = new PDFImage(pdfPath, {
  convertOptions: {
		'-alpha': 'remove',
		'-background': 'white',
		'-resize': '3060x3960'
  }
});
pdfImage.convertPage(0).then(function (imagePath) {
	// 0-th page (first page) of the slide.pdf is available as slide-0.png
	console.log('var path:', imagePath)
  console.log('are we in?', fs.existsSync(imagePath))
	Tesseract.recognize(imagePath)
	.progress(function(packet){
		console.info(packet)
	 })
	.then(function(result){
	 console.log(result.text)
	 process.exit()
	})
	.catch(function(err){
		console.log(err)
		process.exit()
	})});
