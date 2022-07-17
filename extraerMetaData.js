const mm = require("music-metadata");
const convert = require("./convert");
function extraerMetaData(routeFile) {
    try {
         mm.parseFile(routeFile).then((some) => {

            let title =  some.common.title;

            convert(routeFile, title);
        });
    } catch (error) {
        console.log("Error extracting meta data === ", error);
    }
}

module.exports = extraerMetaData;

