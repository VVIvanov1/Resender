const path = require('path');
const fs = require('fs');
// const pathToFolder = 'C:\\Users\\user\\Desktop\\Новая папка\\Новая папка';
const funcs = require('./functions');
const { saveToFolder } = funcs;
const hound = require('hound');

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')));

const gFolder = config.configuration.mirFolderGoogle;
const pathToFolder = config.configuration.pathToFolder;
// console.log(config);



hound.watch(pathToFolder)
    .on('create', (file, stats) => {
        console.log(path.basename(file) + ' was created');
        console.log(path.dirname(file));

        fs.readdir(pathToFolder, (err, files) => {
            if (err) {
                console.log(err);
            } else {
                const processed = files.map(file => path.join(pathToFolder, file))
                processed.forEach(file => {
                    // let name = path.basename(file)
                    saveToFolder(gFolder, path.basename(file), file)
                })

            }
        })
    })

    .on('delete', (file, stats) => {
        console.log(path.basename(file) + ' was deleted');
        console.log(path.dirname(file));
    })


