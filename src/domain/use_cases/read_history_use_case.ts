import DataResponse from "@/data/DataResponse";
import HistoryRepository from "@/data/repositories/history_repository";
import { Result } from "@/types";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default class ReadHistoryUseCase {
    async readHistory(): Promise<DataResponse> {
        return new Promise((resolve, reject) => {
            const history_repository = new HistoryRepository();
            onAuthStateChanged(getAuth(), async (user) => {
                if (user) {
                    try {
                        const result = await history_repository.readHistory(user.email!);
                        resolve(result);
                    } catch (error) {
                        resolve(new DataResponse(Result.Fail, "failed to read history", error));
                    }
                } else {
                    resolve(new DataResponse(Result.Fail, "user is not logged in", {}));
                }
            })
        });
    }
}