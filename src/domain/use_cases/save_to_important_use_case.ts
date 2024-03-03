import DataResponse from "@/data/DataResponse";
import UserRepository from "@/data/repositories/user_repository";
import { Result } from "@/types";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default class SaveToImportantUseCase {
    async saveToImportant(id: string, starBool: boolean) {
        const user_repository = new UserRepository();

        return new Promise((resolve, reject) => {
            onAuthStateChanged(getAuth(), async (user) => {
                if (user) {
                    try {
                        const result = await user_repository.saveToImportant(user.email!, id, starBool);
                        resolve(result);
                    } catch (error) {
                        resolve(new DataResponse(Result.Fail, "failed to save to important", error));
                    }
                } else {
                    resolve(new DataResponse(Result.Fail, "user is not logged in", {}));
                }
            })
        });
    }
}