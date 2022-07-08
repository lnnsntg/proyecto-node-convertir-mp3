const ffmpeg = require("ffmpeg-cli");
const path = require("path");
const ruta = path.join(__dirname, "daily-english-converted\\");

const extensionMp4 = ".mp4";
// ffmpeg.run("-version");
// console.log(ffmpeg.runSync("-version"));

 function convert(routeFile, title) {
  const nameFile = `${ruta}${title}${extensionMp4}`;
  console.log("Converting --- ",nameFile);
  let commands = `-i "${routeFile}" -f lavfi -i color=c='random':s='hd720' -c:a copy -shortest -map_metadata -1 "${nameFile}"`;
  try {
    ffmpeg.runSync(commands);
  } catch (error) {
    console.error(error);
  } finally {
    console.log(`Conversion of [${title}] - finished`);
  }
}

// ffmpeg.runSync(commands, () => { console.log("===========================================================Procesado archivo") })

module.exports = convert;
