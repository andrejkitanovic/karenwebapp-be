import assert from "assert";
import fs from "fs";
import readline from "readline";

import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

const TOKEN_PATH = "../client_oauth_token.json";

const videoFilePath = "../vid.mp4";
const thumbFilePath = "../thumb.png";

export const youtubePublishVideo = (
  title: string,
  description: string,
  tags: string[]
) => {
  assert(fs.existsSync(videoFilePath));
  assert(fs.existsSync(thumbFilePath));

  // Load client secrets from a local file.
  fs.readFile(
    "../client_secret.json",
    function processClientSecrets(err, content) {
      if (err) {
        console.log("[YOUTUBE] Error loading client secret file: " + err);
        return;
      }
      // Authorize a client with the loaded credentials, then call the YouTube API.
      authorize(JSON.parse(content as any), (auth: any) =>
        uploadVideo(auth, title, description, tags)
      );
    }
  );
};

/**
 * Upload the video file.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
const uploadVideo = (
  auth: any,
  title: string,
  description: string,
  tags: string[]
) => {
  const service = google.youtube("v3");

  service.videos.insert(
    {
      auth: auth,
      part: ["snippet,status"],
      requestBody: {
        snippet: {
          title,
          description,
          tags,
          categoryId: "24",
          defaultLanguage: "en",
          defaultAudioLanguage: "en",
        },
        status: {
          privacyStatus: "private",
        },
      },
      media: {
        body: fs.createReadStream(videoFilePath),
      },
    },
    function (err: any, response: any) {
      if (err) {
        console.log("[YOUTUBE] The API returned an error: " + err);
        return;
      }
      console.log(response.data);

      console.log("[YOUTUBE] Video uploaded. Uploading the thumbnail now.");
      service.thumbnails.set(
        {
          auth: auth,
          videoId: response.data.id,
          media: {
            body: fs.createReadStream(thumbFilePath),
          },
        },
        function (err: any, response: any) {
          if (err) {
            console.log("The API returned an error: " + err);
            return;
          }
          console.log(response.data);
        }
      );
    }
  );
};

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
const authorize = (credentials: any, callback: (oauth2Client: any) => void) => {
  const clientSecret = credentials.installed.client_secret;
  const clientId = credentials.installed.client_id;
  const redirectUrl = credentials.installed.redirect_uris[0];
  const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function (err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token as any);
      callback(oauth2Client);
    }
  });
};

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
const getNewToken = (
  oauth2Client: any,
  callback: (oauth2Client: any) => void
) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/youtube.upload"],
  });
  console.log("[YOUTUBE] Authorize this app by visiting this url: ", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", function (code) {
    rl.close();
    oauth2Client.getToken(code, function (err: any, token: any) {
      if (err) {
        console.log(
          "[YOUTUBE] Error while trying to retrieve access token",
          err
        );
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
};

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
const storeToken = (token: object) => {
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) throw err;
    console.log("[YOUTUBE] Token stored to " + TOKEN_PATH);
  });
};
