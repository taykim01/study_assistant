import DataResponse from "@/data/DataResponse";
import HistoryRepository from "@/data/repositories/history_repository";
import GeminiServices from "@/data/services/gemini_services";
import OpenAIServices from "@/data/services/openai_services";
import { AIModel, Result } from "@/types";
import { getAuth } from "firebase/auth";

export default class GetKeywordInfoUseCase {
    // take keyword
    // use openai/gemini service
    // return keyword model

    async getKeywordInfo(keyword: string, model: AIModel): Promise<DataResponse> {
        const open_AI_services = new OpenAIServices();
        const gemini_services = new GeminiServices();
        const history_repository = new HistoryRepository();
        let result;
        if (model === "openai") {
            // use openai service
            const openaiResult = await open_AI_services.generateKeywordInfo(keyword);
            // add to db
            if (openaiResult.result === Result.Success) {
                const user = getAuth().currentUser
                const contents = openaiResult.payload;
                const definition = contents;
                if (user?.email) {
                    result = await history_repository.writeHistory(user.email, keyword, definition, model, false);
                } else {
                    return new DataResponse(Result.Fail, "user is not logged in", {});
                }
                return new DataResponse(Result.Success, "keyword info generated successfully", [openaiResult.payload, result.payload]);
            } else {
                return new DataResponse(Result.Fail, "error generating keyword info", {});
            }
        } else {
            // use gemini service
            return new DataResponse(Result.Success, "gemini is not available yet", {} );
        }
    }
}