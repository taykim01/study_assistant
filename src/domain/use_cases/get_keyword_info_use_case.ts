import DataResponse from "@/data/DataResponse";
import HistoryRepository from "@/data/repositories/history_repository";
import GeminiServices from "@/data/services/gemini_services";
import OpenAIServices from "@/data/services/openai_services";
import { AIModel, Result } from "@/types";

export default class GetKeywordInfoUseCase {
    // take keyword
    // use openai/gemini service
    // return keyword model

    async getKeywordInfo(keyword: string, model: AIModel): Promise<DataResponse> {
        const open_AI_services = new OpenAIServices();
        const gemini_services = new GeminiServices();
        const history_repository = new HistoryRepository();
        if (model === AIModel.OpenAI) {
            // use openai service
            const openaiResult = await open_AI_services.generateKeywordInfo(keyword);
            // add to db
            if (openaiResult.result === Result.Success) {
                const contents = openaiResult.payload;
                const definition = contents[0];
                const example = contents[1];
                const origin = contents[2];
                // const writeHistoryResult = await history_repository.writeHistory("email", keyword, definition, example, origin, model);
                return new DataResponse(Result.Success, "keyword info generated successfully", openaiResult.payload);
            } else {
                return new DataResponse(Result.Fail, "error generating keyword info", {});
            }
        } else {
            // use gemini service
            return new DataResponse(Result.Success, "gemini is not available yet", {} );
        }
    }
}