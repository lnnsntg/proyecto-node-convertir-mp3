const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

const youtube = google.youtube("v3");

const uploadVideo = (auth, pathVideo, titleForYoutube) => {
    youtube.videos.insert(
        {
            auth: auth,
            part: "snippet",
            resource: {
                // Video title and description
                snippet: {
                    title: `${titleForYoutube}`,
                    description:
                        "For ESL students. Improve your listening skill, Listening is your gateway to a language.",
                    categoryId: '27'
                },
            },

            // Create the readable stream to upload the video
            media: {
                body: fs.createReadStream(`${pathVideo}`), // Change here to your real video
            },
        },
        (error, data) => {
            if (error) {
                return console.log("No se ha podido subir el video", error);
            }
            console.log("https://www.youtube.com/watch?v=" + data.data.id);

            // return cb(null, data.data.id);
        }
    );
    setTimeout(() => {
        console.log('Setimeout of 3 min ended')
    }, 180000);
};

module.exports = uploadVideo;