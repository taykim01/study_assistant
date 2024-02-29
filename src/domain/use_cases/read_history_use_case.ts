import DataResponse from "@/data/DataResponse";
import HistoryRepository from "@/data/repositories/history_repository";
import { Result } from "@/types";
import { getAuth } from "firebase/auth";

export default class ReadHistoryUseCase {
    async readHistory(): Promise<DataResponse> {
        const history_repository = new HistoryRepository();
        const user = getAuth().currentUser;
        if (user?.email) {
            return history_repository.readHistory(user.email);
        } else {
            return new DataResponse(Result.Fail, "user is not logged in", {});
        }
    }
}