const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const dotenv = require("dotenv");
dotenv.config({ path: ".env", encoding: "utf8", });
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uploadVideo = require('./uploadVideo')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const SCOPES = [
    'https://www.googleapis.com/auth/youtube.upload',// If modifying these scopes, delete your previously saved credentials
];

const TOKEN_PATH = path.join(__dirname, "tokens.json");

function authorize(credentials,nameFile, title) {
    const clientSecret = credentials.installed.client_secret;
    const clientId = credentials.installed.client_id;
    const redirectUrl = credentials.installed.redirect_uris[0];
    const oAuth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (error, token) => {
        if (error) {
            return getNewToken(oAuth2Client, nameFile, title);
        } else {
            let tokens = JSON.parse(token);
            oAuth2Client.setCredentials(tokens);
            uploadVideo(oAuth2Client,nameFile, title);// Aqui llamaría a servicio para subir video
        }
    });
    
}

const getNewToken = async (oAuth2Client, nameFile, title) => {// Aqui cb es la llamada al servicio subir video
    const authorizationUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });

    console.log('Llamando a servidor', authorizationUrl);

    app.get('/', (req, res) => {
        res.status(301).send({ Location: authorizationUrl });
    });


    app.get('/oauth2callback/', async function (req, res) {
        let q = req.query;
        if (q.error) {
            console.log("Error:" + q.error);

        } else {
            console.log("CODE IS =====" + q.code);

            await oAuth2Client.getToken(q.code, (error, token) => {
                if (error) {
                    return console.log(new Error('Error while trying to retrieve access token', error));
                }
                oAuth2Client.setCredentials(token);
                storeToken(token);
                uploadVideo(oAuth2Client,nameFile, title);
            });
        }
    });
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on http://${process.env.HOST}:${process.env.PORT}`);
    });
};

const storeToken = token => {
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), error => {
        if (error) throw error;
        console.log('Token stored to ' + TOKEN_PATH);
    });
};


module.exports =  authorize ;