import UserRepository from "@/data/repositories/user_repository";

export default class DeleteFromImportantUseCase {
    async deleteFromImportant(email: string, keyword: string) {
        const user_repository = new UserRepository();
        const response = await user_repository.deleteFromImportant(email, keyword);
        return response;
    }
}