const path = require('path')

const fs = require('fs');
const pathToFolder = 'C:\\Users\\user\\Desktop\\Новая папка\\Новая папка'
const funcs = require('./functions')

const hound = require('hound')

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')))



hound.watch(pathToFolder)
    .on('create', (file, stats) => {
        console.log(path.basename(file) + ' was created');
        console.log(path.dirname(file));
        const gFolder = config.configuration.mirFolderGoogle;
        fs.readdir(pathToFolder, (err, files) => {
            if (err) {
                console.log(err);
            } else {
                const processed = files.map(file => path.join(pathToFolder, file))
                processed.forEach(file => {
                    let name = path.basename(file)
                    funcs.saveToFolder(gFolder, name, file)
                })

            }
        })
    })

    .on('delete', (file, stats) => {
        console.log(path.basename(file) + ' was deleted');
        console.log(path.dirname(file));
    })


