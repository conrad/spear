const Tesseract = require('tesseract.js');

Tesseract.recognize('/Users/john-doe/Desktop/text.jpg')
 .progress(function(packet: any){
	 console.info(packet)
	})
 .then(function(result: any){
  console.log(result.text)
 })