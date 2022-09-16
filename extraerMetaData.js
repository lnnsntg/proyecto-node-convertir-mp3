const mm = require("music-metadata");
const convert = require("./convert");
function extraerMetaData(routeFile) {
  try {
    mm.parseFile(routeFile)
      .then((some) => {
        return some.common.title;
      })
      .then((title) =>
        title.replace(/[`~!@#$%^&*()_|+\-=?;:'"“”,.<>\{\}\[\]\\\/]/gi, "")
      )
      .then((title) => convert(routeFile, title));
  } catch (error) {
    console.log("Error extracting meta data === ", error);
  }
}

module.exports = extraerMetaData;
