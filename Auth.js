const { google } = require('googleapis');
const { authenticate } = require('@google-cloud/local-auth');
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

async function authentication() {
    const options = {
        keyfilePath: path.join(__dirname, 'oauth2.keys2.json'),
        scopes: [
            'https://www.googleapis.com/auth/drive.file',
        ]
    }
    const auth = await authenticate(options)
    return auth
    
}

module.exports = authentication