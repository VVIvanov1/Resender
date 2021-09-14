const {google} = require('googleapis');
const drv = google.drive({version:'v3', auth:'AIzaSyD0os-hLYoLP780AU8i8JZvqOOQkpds0bs'});
const dotenv = require('dotenv')

dotenv.config()

async function main () {
  const auth = new google.auth.GoogleAuth({
    // Scopes can be specified either as an array or as a single, space-delimited string.
    scopes: ['https://www.googleapis.com/auth/drive']
  });
  const authClient = await auth.getClient();
  console.log(authClient);

//   obtain the current project Id
  const project = await auth.getProjectId();
  console.log(project);
//   // Fetch the list of GCE zones within a project.
//   const res = await compute.zones.list({ project, auth: authClient });
//   console.log(res.data);
}
// C:\Users\user\AppData\Roaming\gcloud\application_default_credentials.json

// GOOGLE_APPLICATION_CREDENTIALS="C:\Users\user\AppData\Roaming\gcloud\application_default_credentials.json" node app.js

main().catch(console.error);