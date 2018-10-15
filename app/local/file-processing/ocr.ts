const Tesseract = require('tesseract.js')

// const filepath: string = process.argv[2]

console.log('dirname', __dirname)
var t = new Tesseract.TesseractBinding();
console.log("Object created");
// langPath + langCode
Tesseract.create({
  langCode: 'eng',
  langPath: __dirname,
})
t.init("eng");
t.setImage(__dirname + '/test/fixtures/lorem-ipsum.pdf') // filepath)  // "/images/test-image.jpg");
t.processImage();
console.log(t.getText());
t.close();
t.end();