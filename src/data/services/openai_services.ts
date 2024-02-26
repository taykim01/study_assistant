import OpenAI from "openai";
import DataResponse from "../DataResponse";
import { Result } from "@/types";

export default class OpenAIServices {
  async generateKeywordInfo(keyword: string) {
    const openai = new OpenAI({apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true});
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "assistant",
            content: `You are my learning assistant. You are here to help me learn some keywords by extracting the important information into one sentence of definition. Tell me the definition of ${keyword} in one sentence.`,
          },
        ],
        model: "gpt-4",
      });
      const content = completion.choices[0].message.content
      return new DataResponse(
        Result.Success,
        "keyword info generated",
        content
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
