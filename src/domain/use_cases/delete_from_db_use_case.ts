import DataResponse from "@/data/DataResponse";
import HistoryRepository from "@/data/repositories/history_repository";
import { Result } from "@/types";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default class DeleteFromDBUseCase {
    async deleteHistory(keywordID: string) {
        const history_repository = new HistoryRepository();
        
        return new Promise((resolve, reject) => {
            onAuthStateChanged(getAuth(), async (user) => {
                if (user) {
                    try {
                        const result = await history_repository.deleteHistory(user.email!, keywordID)
                        resolve(result);
                    } catch (error) {
                        resolve(new DataResponse(Result.Fail, "failed to delete history", error));
                    }
                } else {
                    resolve(new DataResponse(Result.Fail, "user is not logged in", {}));
                }
            })
        });
    }
}