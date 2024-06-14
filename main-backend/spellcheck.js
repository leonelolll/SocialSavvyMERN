import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const openai = new OpenAI({
  apiKey: "sk-proj-YD8xeFnRCGQP1w0cKqGsT3BlbkFJKNNZm7ZxFWS6ZreapCQN",
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/chat", async (req, res) => {
  const { text } = req.body;
  //let content = await main(text);

  //async function main(text) {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You will be provided with statements, and your task is to convert them to standard, professional English" },
        { role: "user", content: text }
      ],
      temperature: 0.7,
      max_tokens: 64,
      top_p: 1,
    });

  res.send(response.choices[0].message.content.trim());
}
);
const PORT = 5000;

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:${PORT}');
});