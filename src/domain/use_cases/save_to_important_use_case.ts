import DataResponse from "@/data/DataResponse";
import UserRepository from "@/data/repositories/user_repository";
import { Result } from "@/types";
import { getAuth } from "firebase/auth";

export default class SaveToImportantUseCase {
    async saveToImportant(id: string, starBool: boolean) {
        const user_repository = new UserRepository();
        const user = getAuth().currentUser;
        if (user?.email) {
            return user_repository.saveToImportant(user.email, id, starBool);
        } else {
            return new DataResponse(Result.Fail, "user is not logged in", {});
        }
    }
}