const path = require('path');
const fs = require('fs');
const funcs = require('./functions');
const { saveToFolder } = funcs;
const hound = require('hound');

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')));

const gFolder = config.configuration.mirFolderGoogle;
const pathToFolder = config.configuration.pathToFolder;



hound.watch(pathToFolder)
    .on('create', (file, stats) => {

        fs.readdir(pathToFolder, (err, files) => {
            if (err) {
                console.log(err);
            } else {
                    saveToFolder(gFolder, path.basename(file), file)

            }
        })
    })

    .on('delete', (file, stats) => {
        console.log(path.basename(file) + ' was deleted');
        console.log(path.dirname(file));
    })


