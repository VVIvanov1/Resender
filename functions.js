const { google } = require('googleapis')
const path = require('path')
const fs = require('fs')
const dotenv = require('dotenv')

dotenv.config()

const CLIENT_ID = process.env.GOOGLE_DRIVE_CLIENT_ID
const CLIENT_SECRET = process.env.GOOGLE_DRIVE_CLIENT_SECRET
const REDIRECT_URI = process.env.GOOGLE_DRIVE_REDIRECT_URI
const REFRESH_TOKEN = process.env.GOOGLE_DRIVE_REFRESH_TOKEN

const file = path.join(__dirname, 'copy.txt')
const mime = 'text/plain'

const oauth2client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
)
// console.log(oauth2client);

oauth2client.setCredentials({ refresh_token: REFRESH_TOKEN })


const drive = google.drive({
    version: "v3",
    auth: oauth2client
})

// console.log(oauth2client);

// LIST FILES AND FOLDERS
async function listFiles() {

    const params = { pageSize: 10 };

    const res = await drive.files.list(params);
    let folders = res.data.files.filter(obj => obj.mimeType === 'application/vnd.google-apps.folder')
    console.log(folders);
}


// listFiles().catch(console.error)
// [
//     {
//       kind: 'drive#file',
//       id: '1w7X0rxBCRiuSiiKrZMANGzCTVB1o1jyk',      
//       name: 'Processed MIRs',
//       mimeType: 'application/vnd.google-apps.folder'
//     },
//     {
//       kind: 'drive#file',
//       id: '134vBXfTB5FnQy6PUSj5Ir2Pqz8AxBWS5',      
//       name: 'MIR Files',
//       mimeType: 'application/vnd.google-apps.folder'
//     }
//   ]


// CREATE FILE FOLDER IN GOOGLE

async function listFilesInFolder(id) {
    // let folderId = '134vBXfTB5FnQy6PUSj5Ir2Pqz8AxBWS5'
    const params = { q: `'${id}' in parents` }
    const res = await drive.files.list(params)
    console.log(res.data);
}
// listFilesInFolder('134vBXfTB5FnQy6PUSj5Ir2Pqz8AxBWS5').catch(console.error)



async function uploadFile() {

    const response = await drive.files.create({
        requestBody: {
            name: 'acopy.txt',
            mimeType: mime
        },
        media: {
            mimeType: mime,
            body: fs.createReadStream(file)
        }
    })
    console.log(response.data);

}
// uploadFile().catch(console.error)




async function createFolder(name) {
    var fileMetadata = {
        'name': name,
        'mimeType': 'application/vnd.google-apps.folder'
    };

    drive.files.create({
        resource: fileMetadata,
        fields: 'id'
    }, function (err, file) {
        if (err) {
            // Handle error
            console.error(err);
        } else {
            console.log('Folder Id: ', file.id);
            // console.log(file);
        }
    });
}

// createFolder('Processed MIRs').catch(console.error)


// SAVE FILE TO SPECIFFIC FOLDER ON GOOGLE DRIVE

/**
* Function that saves to specific folder on google drive
* Accepts 3 parameters - google drive folder id, file basename and path to file
*
* @function saveToFolder
* @param {string} folderId - id of folder in google drive.
* @param {string} name - file basename that needs to be passed and saved to gdrive.
* @param {string} - full path t file in OS
*/


async function saveToFolder(folderId, name, file) {
    // const folderId = '134vBXfTB5FnQy6PUSj5Ir2Pqz8AxBWS5 @name = file name @file = path to file @ folderId = google drive'
    
    let fileMetadata = {
        name: name,
        parents: [folderId]
    }
    let media = {
        mimeType: 'text/plain',
        body: fs.createReadStream(file)
    };
    drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
    }, function (err, file) {
        if (err) {

            console.error(err);
        } else {
            console.log('File Id: ', file.id);
        }
    }
    )
}
// saveToFolder('134vBXfTB5FnQy6PUSj5Ir2Pqz8AxBWS5').catch(console.error)

// MOVING FILES BETWEEN FOLDERS

async function moveFile(fileId, folderId) {

    drive.files.get({
        fileId: fileId,
        fields: 'parents'
    }, (err, file) => {
        if (err) {
            console.log(err);
        } else {
            let prevParents = file.parents;
            console.log(prevParents);
            drive.files.update({
                fileId: id,
                addParents: folderId,
                removeParents: prevParents,
                fields: 'id, parents'
            }, (err, file) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(file);
                }
            })
        }
    })

}

// moveFile('1O-YocZxPbFrReXrtrxcQ5dF2IPOzaI2M', '1w7X0rxBCRiuSiiKrZMANGzCTVB1o1jyk').catch(console.error)

// DOWNLOAD FILES FROM GOOGLE DRIVE

async function downloadFile() {
    let fileId = '1Y_ekf0MM7Yq2Ylqp6gmTLhuI2bRE25M6';
    let dest = fs.createWriteStream('C:\\Users\\user\\Desktop\\Новая папка\\Новая папка\\test.txt');

    drive.files.get({
        fileId: fileId,
        alt: 'media'
    }, { responseType: 'stream' }, (err, res) => {
        console.log(res);
        if (err) {
            console.log(err);
        } else {
            console.log(res);
            res.data
                .on('end', () => console.log('Done'))
                .on('error', (err) => console.log(err))
                .pipe(dest)
        }

    })

}

// downloadFile().catch(console.error)

module.exports = {
    downloadFile,
    listFiles,
    listFilesInFolder,
    moveFile,
    saveToFolder,
    createFolder,
    uploadFile
}