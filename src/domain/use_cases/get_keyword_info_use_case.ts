import DataResponse from "@/data/DataResponse";
import GeminiServices from "@/data/services/gemini_services";
import OpenAIServices from "@/data/services/openai_services";
import { AIModel, Result } from "@/types";

export default class GetKeywordInfoUseCase {
    // take keyword
    // use openai/gemini service
    // return keyword model

    async getKeywordInfo(keyword: string, model: AIModel): Promise<DataResponse> {
        const openai = new OpenAIServices();
        const gemini = new GeminiServices()
        if (model === AIModel.OpenAI) {
            // use openai service
            return openai.generateKeywordInfo(keyword);
        } else {
            // use gemini service
            return new DataResponse(Result.Success, "gemini not available yet", {} );
        }
    }
}