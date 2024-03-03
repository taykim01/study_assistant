import DataResponse from "@/data/DataResponse";
import HistoryRepository from "@/data/repositories/history_repository";
import { Result } from "@/types";
import { getAuth } from "firebase/auth";

export default class ModifyKeywordUseCase {
    async modifyHistory(keywordID: string, modificationContent: {}) {
        const history_repository = new HistoryRepository();
        const user = getAuth().currentUser;
        if (user) {
            return await history_repository.modifyHistory(user.email!, keywordID, modificationContent);
        } else {
            return new DataResponse(Result.Fail, "user is not logged in", {});
        }
    }
}