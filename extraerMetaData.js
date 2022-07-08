const mm = require("music-metadata");
const convert = require("./convert");
function extraerMetaData(routeFile) {
    try {
        await mm.parseFile(routeFile).then((some) => {

            let title =  some.common.title;

            convert(routeFile, title);
        });
    } catch (error) {
        console.log("ERROR EN EXTRAC=====", error);
    }
}

module.exports = extraerMetaData;

