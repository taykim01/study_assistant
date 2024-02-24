import DataResponse from "@/data/DataResponse";
import HistoryRepository from "@/data/repositories/history_repository";

export default class ReadHistoryUseCase {
    async readHistory(email: string): Promise<DataResponse> {
        const history_repository = new HistoryRepository();
        return history_repository.readHistory(email);
    }
}