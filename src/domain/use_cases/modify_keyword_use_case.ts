import HistoryRepository from "@/data/repositories/history_repository";

export default class ModifyKeywordUseCase {
    async modifyHistory(email: string, keywordID: string, modificationContent: {}) {
        const history_repository = new HistoryRepository();
        const response = await history_repository.modifyHistory(email, keywordID, modificationContent);
        return response;
    }
}