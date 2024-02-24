import UserRepository from "@/data/repositories/user_repository";

export default class SaveToImportantUseCase {
    async saveToImportant(email: string, keyword: string) {
        const user_repository = new UserRepository();
        const response = await user_repository.saveToImportant(email, keyword);
        return response;
    }
}