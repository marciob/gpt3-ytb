// using chunk text code

const { Configuration, OpenAIApi } = require("openai");
const ytb_prompt = require("./ytb_prompt");
const getSubtitles = require("youtube-captions-scraper").getSubtitles;

require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

getSubtitles({
  videoID: "liDOMbZTwO0", // youtube video id
  lang: "en", // default: `en`
}).then(function (captions) {
  let result = captions.map(({ text }) => text).join(" ");

  call(result);
  //   console.log(result);
});

// Set the maximum context length of the model
const maxLength = 3000;

// Set the size of the chunks you want to create
const chunkSize = 2800;

// Initialize a counter to keep track of the current position in the text
let counter = 0;

async function call(_prompt) {
  while (counter < _prompt.length) {
    // Extract a chunk of the specified size
    const chunk = _prompt.slice(counter, counter + chunkSize);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: ytb_prompt + chunk,
      max_tokens: maxLength,
      temperature: 0.7,
    });

    // Update the counter to start at the next position in the text on the next iteration
    counter += chunkSize;

    //console.log the resul from the response object
    //trimStart() is used only for styling purpose to remove the default initial spaces from the text response
    console.log(response.data.choices[0].text.trimStart());
  }
}
