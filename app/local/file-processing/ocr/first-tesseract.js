const Tesseract = require('tesseract.js');
console.log('dirname', __dirname)

Tesseract.recognize(__dirname + '/../../../../test/fixtures/lorem-ipsum.pdf')
 .progress(function(packet){
	 console.info(packet)
	})
 .then(function(result){
  console.log(result.text)
 })
 .catch(function(err){
	 console.log(err)
 })