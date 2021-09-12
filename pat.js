const path = require('path')

let url = 'C:\\Users\\Biletalu\\Documents/tuts\\contextBridge\\package.json'
let urlTest = "C://Users/Biletalu"


let url1 = url.replace(/\\t/g, "/t")
let url2 = url1.replace(/\\/g, "/");

let normalPath = url.split(path.sep)
//let normalPath = new URL(url)//.pathname.replace(/\\/g, "//")
// let urlArr = url2.split('/')


let log = console.log;
// log(url)
// log(urlTest)
// log(path.normalize(url).replace(/\\/g, "/"))
log(path.normalize(path.parse(url).dir))
// log(normalPath)
// log(url1)
// log(url2)
// log(path.basename(url))
// log(path.dirname(url))
// log(path.parse(url2))