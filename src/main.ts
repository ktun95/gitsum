import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";
import { execSync } from "child_process"

const LLM_MODEL = new ChatOpenAI({ model: "gpt-3.5-turbo" });
const SYSTEM_PROMPT = "Generate a bullet pointed summary from the provided git commit messages"

const summarize = async () => {
  // probably need to handle this buffer in some way. If the output of gitlog is too long, it will result in a buffer overflow error
  const buffer = execSync("git log --since=2024-06-1");
  const messages = [
    new SystemMessage(SYSTEM_PROMPT),
    new HumanMessage(buffer.toString("utf-8")),
  ];
  const { content } = await LLM_MODEL.invoke(messages);
  console.log(content);
}


const main = () => {
  switch(process.argv[2]) {
    case "summarize":
      summarize();
      break;
    default:
      process.exit(1)
  }
}

main();
