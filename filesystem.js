
const fs = require('fs');
const path = require('path')
const pathToFolder = 'C:\\Users\\user\\Desktop\\Новая папка\\Новая папка'
const paTH = 'C:/Users/user/Desktop/vse/web site contents/certificates'




function getFilestList() {
    fs.readdir(pathToFolder, (err, files) => {


        if (err) {
            console.log(err);
        } else {
           let processed =  files.map(file => path.join(pathToFolder, file))
            console.log(processed);
        }

    })
}

getFilestList()