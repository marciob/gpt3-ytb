const { Configuration, OpenAIApi } = require("openai");
const ytb_prompt = require("./ytb_prompt");

const { spawn, spawnSync } = require("child_process");

const pythonProcess = spawnSync("python", [
  "./ytb_transcript.py",
  "get_text",
  "IG0J_ynkemI",
]);

require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function call() {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: ytb_prompt,
    max_tokens: 1000,
    temperature: 0,
  });

  //console.log the resul from the response object
  //trimStart() is used only for styling purpose to remove the default initial spaces from the text response
  console.log(response.data.choices[0].text.trimStart());
}

// call();

let returnedTextCode;

// async function returnFromPython() {
//   await pythonProcess.stdout.on("data", (data) => {
//     returnedTextCode = data.toString();
//     console.log(returnedTextCode);
//   });
// }

async function returnFromPython() {
  returnedTextCode = pythonProcess.stdout.toString();
  console.log(returnedTextCode);
}

returnFromPython();
