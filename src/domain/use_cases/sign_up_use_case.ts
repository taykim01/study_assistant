import DataResponse from "@/data/DataResponse";
import UserRepository from "@/data/repositories/user_repository";
import { Result } from "@/types";

export default class SignUpUseCase {

  user_repository = new UserRepository();
  
  async checkIfEmailExists(email: string): Promise<DataResponse> {
    const response = await this.user_repository.queryUserByEmail(email);
    return response;
  }

  async createUser(email: string, password: string): Promise<DataResponse> {
    if ((await this.checkIfEmailExists(email)).result === Result.Fail) {
      const response = await this.user_repository.createUser(email, password);
      return response;
    } else {
      const response = new DataResponse(Result.Fail, "User already exists", {});
      return response;
    }
  }
}
