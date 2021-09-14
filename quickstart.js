'use strict';

// [START main_body]
const path = require('path');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');
console.log(path.join(__dirname, 'oauth2.keys.json'));
const getfilelist = require("google-drive-getfilelist");
/**
 * Lists the names and IDs of up to 10 files.
 */
async function runSample() {
    // Obtain user credentials to use for the request
    const auth = await authenticate({
        keyfilePath: path.join(__dirname, 'oauth.keys1.json'),

        scopes: 'https://www.googleapis.com/auth/drive',
    });

    //   console.log(keyfilePath);

    const topFolderId = "main"; // Please set the top folder ID.
    // getfilelist.GetFileList(
    //     {
    //         auth: auth,
    //         fields: "files(id)",
    //         id: topFolderId,
    //     },
    //     (err, res) => {
    //         if (err) {
    //             console.log(err);
    //             return;
    //         }
    //         const fileList = res.fileList.flatMap(({ files }) => files);
    //         console.log(fileList);
    //     }
    // );


    google.options({ auth });

    const service = google.drive('v3');

    const res = await service.files.list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)',
    });
    const files = res.data.files;
    console.log(res.data);
    // console.log(files);
//     if (files.length === 0) {
//         console.log('No files found.');
//     } else {
//         console.log('Files:');
//         for (const file of files) {
//             console.log(`${file.name} `);
//         }
//     }
}
if (module === require.main) {
    runSample().catch(console.error);
}
// [END main_body]
module.exports = runSample;