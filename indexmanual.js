const { google } = require('googleapis');
// const drv = google.drive({ version: 'v3', auth: 'AIzaSyD0os-hLYoLP780AU8i8JZvqOOQkpds0bs' });
const dotenv = require('dotenv')
const { authenticate } = require('@google-cloud/local-auth');
const path = require('path')
const fs = require('fs');
const os = require('os');
const uuid = require('uuid');
const Auth = require('./Auth')

const drive = google.drive("v3")

dotenv.config()

async function downloadFile() {
  const oath = await Auth();
  const drive = google.drive({ version: 'v3', oath })
  const dest = fs.createWriteStream(path.join(os.tmpdir(), uuid.v4()))
  console.log(os.tmpdir());
  const returnData = [];
  const fl =  {
    kind: 'drive#file',
    id: '1_ZzeOitqV4hF3W1RIook4f78p01-cUSbXcKJBjybaKE',
    name: 'Учетные данные',
    mimeType: 'application/vnd.google-apps.spreadsheet'
  }
  // console.log(await drive.files.list({}));
  // drive.files.get(
  //   { fileId: fileId, alt: 'media', },
  //   { responseType: 'stream' }, (err, res) => {
  //     console.log(res);
  //     if (err) {
  //       returnData.push(["ERR"]);
  //       returnData.push("" + err);
  //     } else {
  //       res.data.pipe(dest);
  //       returnData.push("Downloaded");
  //     }
  //     // callback(returnData);
  //     console.log(returnData);
  //   });
  drive.files.export({
    auth: oath,
    fileId: fl.id,
    mimeType: fl.mimeType
  })

}
//   const options = {
//     keyfilePath: path.join(__dirname, 'oauth2.keys2.json'),
//     scopes: [
//       'https://www.googleapis.com/auth/drive',
//       'https://www.googleapis.com/auth/drive.appdata',
//       'https://www.googleapis.com/auth/drive.file',
//       'https://www.googleapis.com/auth/drive.metadata',
//       'https://www.googleapis.com/auth/drive.metadata.readonly',
//       'https://www.googleapis.com/auth/drive.readonly',
//     ]
//   }
//   const auth = await authenticate(options)
//   google.options(auth)

//   // 
//   
//   console.log(drive);

//   // console.log(os.tmpdir());
//   await drive.files
//     .get({ fileId, alt: 'media' }, { responseType: 'stream' })
//     .then(res => {
//       res.data
//         .on('end', () => {
//           console.log('Done downloading file.');
//         })
//         .on('error', err => {
//           console.error('Error downloading file.');
//         })
//         .on('data', d => {
//           progress += d.length;
//           if (process.stdout.isTTY) {
//             process.stdout.clearLine();
//             process.stdout.cursorTo(0);
//             process.stdout.write(`Downloaded ${progress} bytes`);
//           }
//         })
//         .pipe(dest);
//     });

// }
const fileId = '13LdgLm3B7TLcvN5YzwQKKcocT58aZYm3h-X8q8dTIeU'

// downloadFile(fileId)


// function downloadFile(drive, fileId, fileName) {
//   const filePath = path.join(os.tmpdir(), uuid.v4());
//   const dest = fs.createWriteStream(filePath);
//   let progress = 0;

//   drive.files.get(
//     { fileId, alt: 'media' },
//     { responseType: 'stream' }
//   ).then(res => {
//     res.data
//       .on('end', () => {
//         console.log('Done downloading file.');
//       })
//       .on('error', err => {
//         console.error('Error downloading file.');
//       })
//       .on('data', d => {
//         progress += d.length;
//         if (process.stdout.isTTY) {
//           process.stdout.clearLine();
//           process.stdout.cursorTo(0);
//           process.stdout.write(`Downloaded ${progress} bytes`);
//         }
//       })
//       .pipe(dest);
//   });
// }

async function listFiles(query) {
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, 'oauth2.keys.json'),
    scopes: 'https://www.googleapis.com/auth/drive.metadata.readonly',
  });
  // const auth = await Auth()
  google.options({ auth });
  const params = { pageSize: 3 };
  params.q = query;
  const res = await drive.files.list(params);
  console.log(res.data.files);
  return res.data.files.map(file => file.name);
}

async function main() {
  const auth = new google.auth.GoogleAuth({
    // Scopes can be specified either as an array or as a single, space-delimited string.
    scopes: ['https://www.googleapis.com/auth/drive']
  });
  const authClient = await auth.getClient();
  // console.log(authClient);

  //   obtain the current project Id
  const project = await auth.getProjectId();
  const accessToken = await auth.getAccessToken();
  const creds = await auth.getCredentials();

  const proId = await authClient.projectId

  console.log(authClient);

  // console.log(project);
  //   // Fetch the list of GCE zones within a project.
  //   const res = await compute.zones.list({ project, auth: authClient });
  //   console.log(res.data);
}
// C:\Users\user\AppData\Roaming\gcloud\application_default_credentials.json

// GOOGLE_APPLICATION_CREDENTIALS="C:\Users\user\AppData\Roaming\gcloud\application_default_credentials.json" node app.js

// main().catch(console.error);
// runSample().catch(console.error)
listFiles().catch(console.error)
// const fileId = '13LdgLm3B7TLcvN5YzwQKKcocT58aZYm3h-X8q8dTIeU'

// downloadFile('13LdgLm3B7TLcvN5YzwQKKcocT58aZYm3h-X8q8dTIeU').catch(console.error)
// downloadFile()
