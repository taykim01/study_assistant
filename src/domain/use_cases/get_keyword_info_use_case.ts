import DataResponse from "@/data/DataResponse";
import HistoryRepository from "@/data/repositories/history_repository";
import GeminiServices from "@/data/services/gemini_services";
import OpenAIServices from "@/data/services/openai_services";
import { AIModel, Result } from "@/types";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default class GetKeywordInfoUseCase {
    // take keyword
    // use openai/gemini service
    // return keyword model

    async getKeywordInfo(keyword: string, model: AIModel): Promise<DataResponse> {
        const open_AI_services = new OpenAIServices();
        const gemini_services = new GeminiServices();
        const history_repository = new HistoryRepository();
        if (model === "openai") {
            // use openai service
            const openaiResult = await open_AI_services.generateKeywordInfo(keyword);
            const contents = openaiResult.payload;
            const definition = contents;
            // add to db
            if (openaiResult.result === Result.Success) {
                return new Promise((resolve, reject) => {
                    onAuthStateChanged(getAuth(), async (user) => {
                        if (user) {
                            try {
                                const result = await history_repository.writeHistory(user.email!, keyword, definition, model, false);
                                resolve(result);
                            } catch (error) {
                                resolve(new DataResponse(Result.Fail, "failed to write new history", error));
                            }
                        } else {
                            resolve(new DataResponse(Result.Fail, "user is not logged in", {}));
                        }
                    })
                });
            } else {
                return new DataResponse(Result.Fail, "error generating keyword info", {});
            }
        } else {
            // use gemini service
            return new DataResponse(Result.Success, "gemini is not available yet", {} );
        }
    }
}