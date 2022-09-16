const ffmpeg = require("ffmpeg-cli");
const path = require("path");
const fs = require("fs");
const ruta = path.join(__dirname, "daily-english-converted", "/");
const authorize = require("./authorize.js");

const extensionMp4 = ".mp4";
// ffmpeg.run("-version");
// console.log(ffmpeg.runSync("-version"));

async function convert(routeFile, title) {
  const nameFile = `${ruta}${title}${extensionMp4}`;
  console.log("Converting --- ", nameFile);
  let commands = `-loglevel panic -i "${routeFile}" -f lavfi -i color=c='random':s='hd720' -c:a copy -shortest -map_metadata -1 "${nameFile}"`;

  try {
    ffmpeg.runSync(commands);
    fs.readFile("client_secret.json", async (error, content) => {
      if (error) {
        console.log("Error loading client secret file: " + error);
      }
      let credentials = await JSON.parse(content);
      // Authorize a client with the loaded credentials
      authorize(credentials, nameFile, title);
    });
  } catch (error) {
    console.error(error);
  } finally {
    console.log(`Conversion of [${title}] - finished`);
  }
}

module.exports = convert;
