import DataResponse from "@/data/DataResponse";
import HistoryRepository from "@/data/repositories/history_repository";
import { Result } from "@/types";
import { getAuth } from "firebase/auth";

export default class DeleteFromDBUseCase {
    async deleteHistory(keywordID: string) {
        const history_repository = new HistoryRepository();
        const user = getAuth().currentUser;
        if (user?.email) {
            return await history_repository.deleteHistory(user.email, keywordID)
        } else {
            return new DataResponse(Result.Fail, "user is not logged in", {});
        }
    }
}