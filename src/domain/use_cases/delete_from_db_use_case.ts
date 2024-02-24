import HistoryRepository from "@/data/repositories/history_repository";

export default class DeleteFromDBUseCase {
    async deleteHistory(email: string, keywordID: string) {
        const history_repository = new HistoryRepository();
        const response = await history_repository.deleteHistory(email, keywordID);
        return response;
    }
}