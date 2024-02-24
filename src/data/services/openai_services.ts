import OpenAI from "openai";
import DataResponse from "../DataResponse";
import { Result } from "@/types";

export default class OpenAIServices {
  async generateKeywordInfo(keyword: string) {
    const openai = new OpenAI();
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are my learning assistant. You are here to help me learn some keywords by extracting the important information into one sentence of definition.",
          },
          {
            role: "assistant",
            content: `Tell me the definition of ${keyword} in one sentence.`,
          },
          { role: "assistant", content: `Give me an example of ${keyword}.` },
          {
            role: "assistant",
            content: `Tell me the origin or the root of the word ${keyword}.`,
          },
        ],
        model: "gpt-4",
      });
      const contents = [];
      for (let i = 0; i < 3; i++) {
        contents.push(completion.choices[i].message.content);
      }
      return new DataResponse(
        Result.Success,
        "keyword info generated",
        contents
      );
    } catch (error) {
      return new DataResponse(
        Result.Fail,
        "error generating keyword info",
        error
      );
    }
  }
}
