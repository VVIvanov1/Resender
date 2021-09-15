const path = require('path')
const fs = require('fs')

const obj = {"person":{name: 'vasily',
    surename: 'ivanov',
    age: 40}
}
const newFilePath = path.join(__dirname, 'test.json')
// console.log(JSON.stringify(obj));
// console.log(JSON.parse(obj));

fs.writeFile(newFilePath, JSON.stringify(obj), (err) =>{
    if(err){
        console.log(err);
    }else{
        console.log('file saved!');
    }
})