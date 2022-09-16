const fs = require("fs");
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
          categoryId: "27",
        },
      },
      // Create the readable stream to upload the video
      media: {
        body: fs.createReadStream(`${pathVideo}`), // Change here to your real video
      },
    },
    (error, data) => {
      if (error) {
        console.log(error);
      }
      let idData = data.data.id;
      console.log("https://www.youtube.com/watch?v=" + idData);
    }
  );
};

module.exports = uploadVideo;
