import DataResponse from "@/data/DataResponse";
import AuthRepository from "@/data/services/auth_repository";

export default class LogInUseCase {
    async logIn(email: string, password: string): Promise<DataResponse> {
        const auth_repository = new AuthRepository();
        const response = await auth_repository.login(email, password);
        return response;
    }
}