import DataResponse from "@/data/DataResponse";
import AuthRepository from "@/data/services/auth_repository";

export default class LogOutUseCase {
    async logOut(): Promise<DataResponse> {
        const auth_repository = new AuthRepository()
        return auth_repository.logOut()
    }
}