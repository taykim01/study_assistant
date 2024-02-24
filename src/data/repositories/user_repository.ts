import {
  query,
  collection,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import DataResponse, { Result } from "../DataResponse";
import { db } from "../firebase";
import UserModel from "@/domain/models/user_model";

export default class UserRepository {
  login(email: string, password: string): Promise<DataResponse> {
    const response = new DataResponse(
      Result.Success,
      "User logged in successfully",
      { email }
    );
    return Promise.resolve(response);
  }

  logout(email: string): Promise<DataResponse> {
    const response = new DataResponse(
      Result.Success,
      "User logged in successfully",
      { email }
    );

    return Promise.resolve(response);
  }

  async queryUserByEmail(email: string): Promise<DataResponse> {
    const user: {}[] = [];
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      user.unshift({
        ...doc.data(),
        id: doc.id,
      });
    });

    if (user.length === 0) {
      return new DataResponse(Result.Fail, "User not found in database", {});
    } else {
      return new DataResponse(
        Result.Success,
        "User found in database",
        user[0]
      );
    }
  }

  async createUser(email: string, password: string): Promise<DataResponse> {
    try {
      const user = new UserModel(new Date(), email, password).toObject();
      const docRef = doc(collection(db, "users"), email);
      await setDoc(docRef, user);
      return new DataResponse(Result.Success, "User successfully created", {});
    } catch (error) {
      return new DataResponse(Result.Fail, "User not created", {});
    }
  }

  updateUser(email: string, password: string): Promise<DataResponse> {
    const response = new DataResponse(
      Result.Success,
      "User logged in successfully",
      { email }
    );

    return Promise.resolve(response);
  }

  deleteUser(email: string): Promise<DataResponse> {
    const response = new DataResponse(
      Result.Success,
      "User logged in successfully",
      { email }
    );
    return Promise.resolve(response);
  }
}
