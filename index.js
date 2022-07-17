const extraerMetada = require("./extraerMetaData");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config({ path: ".env", encoding: "utf8", })


const extensionMp3 = ".mp3";
const prefijoMp3 = "\\de";
const directory = path.join(__dirname, "daily-english");

// Function find files in mp3

function pad(n, width = 4, z) {
    z = z || "0";
    n = n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

// Check if file mp3 exist

async function convertMp3(from = 1, at = 5) {
    let n = from;

    for (let index = from; index <= at; index++) {
        let startFileMp3 = await pad(n);
        let routeFile = `${directory}${prefijoMp3}${startFileMp3}${extensionMp3}`;

        try {
            fs.accessSync(routeFile);
            extraerMetada(routeFile);

        } catch (error) {
            console.log(`Error al leer en archivo ${prefijoMp3}${startFileMp3}`);
        }

        n += 1;
    }
}

convertMp3(59, 60); //maximo 1305




