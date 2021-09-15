<<<<<<< HEAD
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const dotenv = require('dotenv')

dotenv.config()



const grefreshToken = '1//041PRVAcl1_KwCgYIARAAGAQSNwF-L9IrY4Kh8kBg_26FNMcXpVv9YKCXDS1vZBQVmA68s04-nBFxK1egu-k4mJy7Tef4BUTLXNs'
const gaccessToken = 'ya29.a0ARrdaM_z6bwSHDdndn1uwOJjhDa91I50UU1RIcvUCv-EpvZ9u5C0kWgkdJuTJjqoTEACa21GtiR5txnFiVlGwt_MzagTFPgVe42bnjdIKfl-Ii5ODOShjWHXIayq6ypn9Cnqj1nbC2Us3pO6aCT6Ss5uUXmk'

const clientId = process.env.GOOGLE_DRIVE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET;
const redirectUri = process.env.GOOGLE_DRIVE_REDIRECT_URI;
// console.log(process.env.GOOGLE_DRIVE_REFRESH_TOKEN);

const client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);



client.setCredentials({ refresh_token: process.env.GOOGLE_DRIVE_REFRESH_TOKEN });
const service = google.drive({version:"v3",  client})

var fileMetadata = {
  'name': 'Invoices',
  'mimeType': 'application/vnd.google-apps.folder'
};
service.files.create({
  resource: fileMetadata,
  fields: 'id'
}, function (err, file) {
  if (err) {
    // Handle error
    console.error(err);
  } else {
    console.log('Folder Id: ', file.id);
  }
});




// console.log(client);
// console.log(google.drive({
//   version: 'v3',
//   auth: client
// }));

// // If modifying these scopes, delete token.json.
// const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
// // The file token.json stores the user's access and refresh tokens, and is
// // created automatically when the authorization flow completes for the first
// // time.
// const TOKEN_PATH = 'token.json';

// // Load client secrets from a local file.
// fs.readFile('credentials.json', (err, content) => {
//   if (err) return console.log('Error loading client secret file:', err);
//   // Authorize a client with credentials, then call the Google Drive API.
//   authorize(JSON.parse(content), listFiles);
// });

// /**
//  * Create an OAuth2 client with the given credentials, and then execute the
//  * given callback function.
//  * @param {Object} credentials The authorization client credentials.
//  * @param {function} callback The callback to call with the authorized client.
//  */
// function authorize(credentials, callback) {
//   const {client_secret, client_id, redirect_uris} = credentials.installed;
//   const oAuth2Client = new google.auth.OAuth2(
//       client_id, client_secret, redirect_uris[0]);

//   // Check if we have previously stored a token.
//   fs.readFile(TOKEN_PATH, (err, token) => {
//     if (err) return getAccessToken(oAuth2Client, callback);
//     oAuth2Client.setCredentials(JSON.parse(token));
//     callback(oAuth2Client);
//   });
// }

// /**
//  * Get and store new token after prompting for user authorization, and then
//  * execute the given callback with the authorized OAuth2 client.
//  * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
//  * @param {getEventsCallback} callback The callback for the authorized client.
//  */
// function getAccessToken(oAuth2Client, callback) {
//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: SCOPES,
//   });
//   console.log('Authorize this app by visiting this url:', authUrl);
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });
//   rl.question('Enter the code from that page here: ', (code) => {
//     rl.close();
//     oAuth2Client.getToken(code, (err, token) => {
//       if (err) return console.error('Error retrieving access token', err);
//       oAuth2Client.setCredentials(token);
//       // Store the token to disk for later program executions
//       fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
//         if (err) return console.error(err);
//         console.log('Token stored to', TOKEN_PATH);
//       });
//       callback(oAuth2Client);
//     });
//   });
// }

// /**
//  * Lists the names and IDs of up to 10 files.
//  * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
//  */
// function listFiles(auth) {
//   const drive = google.drive({version: 'v3', auth});
//   drive.files.list({
//     pageSize: 10,
//     fields: 'nextPageToken, files(id, name)',
//   }, (err, res) => {
//     if (err) return console.log('The API returned an error: ' + err);
//     const files = res.data.files;
//     if (files.length) {
//       console.log('Files:');
//       files.map((file) => {
//         console.log(`${file.name} (${file.id})`);
//       });
//     } else {
//       console.log('No files found.');
//     }
//   });
// }
=======
const electron = require('electron')
const { app, BrowserWindow, ipcMain, dialog } = electron;
const path = require('path');

let MainWindow;

app.on('ready', () => {
    MainWindow = new BrowserWindow({
        width: 300,
        height: 500,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
            nativeWindowOpen: true,
            enableRemoteModule: false
        }
    })
    MainWindow.loadURL(`file://${__dirname}/index.html`)
})

ipcMain.on('toMain:path', async (event, args) => {
    const res = await dialog.showOpenDialog(MainWindow, {
        properties: ['openDirectory']
    })
    MainWindow.webContents.send('fromMain:path',await res)
    
})
// ipcMain.on("toMain:person", (event, args) => {
//     console.log(args);
//     MainWindow.webContents.send('fromMain:person', args)

// });

// ipcMain.on("toMain:car", (event, args) => {
//     console.log(args);
//     MainWindow.webContents.send('fromMain:car', args)

// });
// ipcMain.on("toMain:test", async (event, args) =>{
//     const res = await dialog.showOpenDialog(MainWindow, {
//         properties: ["openDirectory"]
//     })
//     // console.log(res);
//     MainWindow.webContents.send('fromMain:path', res)
// })
// some comments here
>>>>>>> 4495c698772a4d9d06aee894195bcdf658f53829
