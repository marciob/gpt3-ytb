const { Configuration, OpenAIApi } = require("openai");
const ytb_prompt = require("./ytb_prompt");
const getSubtitles = require("youtube-captions-scraper").getSubtitles;

require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

getSubtitles({
  videoID: "IG0J_ynkemI", // youtube video id
  lang: "en", // default: `en`
}).then(function (captions) {
  //   let result = captions.map(
  //     ({ start, text }) => `${text} (start time: ${start})`
  //   );

  let result = captions.map(({ text }) => text).join(" ");

  //   call(result);
  console.log(result);
});

async function call(prompt) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "resume the following youtube video text transcription: " + prompt,
    max_tokens: 14000,
    temperature: 0,
  });

  //console.log the resul from the response object
  //trimStart() is used only for styling purpose to remove the default initial spaces from the text response
  console.log(response.data.choices[0].text.trimStart());
}
