// const fs = require('fs')
const path = require('path')
const hound = require('hound');
const pathToFolder = 'C:\\Users\\Biletalu\\Desktop\\Новая папка\\Новая папка'

// fs.watch(pathToFolder, (event, file)=>{
//    console.log(event);
//    console.log(file);
// })

const watcher = hound.watch(pathToFolder)

watcher.on('create', (file, stats) => {
    console.log(path.basename(file)  + ' was created');
    console.log(path.dirname(file));
})

watcher.on('delete', (file, stats) => {
    console.log(path.basename(file)  + ' was deleted');
    console.log(path.dirname(file));
})