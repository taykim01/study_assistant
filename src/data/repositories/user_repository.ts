import {
  query,
  collection,
  where,
  getDocs,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import DataResponse from "../DataResponse";
import { db } from "../firebase";
import UserModel from "@/domain/models/user_model";
import { Result } from "@/types";

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

  async saveToImportant(email: string, keyword: string): Promise<DataResponse> {
    try {
      const users: any[] = [];
      const q = query(
        collection(db, "users", email, "history"),
        where("keyword", "==", keyword)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        users.unshift({
          ...doc.data(),
          id: doc.id,
        });
      });
      const docRef = doc(db, "users", email, "history", users[0].id);
      await updateDoc(docRef, { important: true });
      return new DataResponse(Result.Success, "saved to important", {});
    } catch (error) {
      return new DataResponse(Result.Fail, "error saving to important", error);
    }
  }

  async deleteFromImportant(email: string, keyword: string): Promise<DataResponse> {
    try {
      const users: any[] = [];
      const q = query(
        collection(db, "users", email, "history"),
        where("keyword", "==", keyword)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        users.unshift({
          ...doc.data(),
          id: doc.id,
        });
      });
      const docRef = doc(db, "users", email, "history", users[0].id);
      await updateDoc(docRef, { important: false });
      return new DataResponse(Result.Success, "saved to important", {});
    } catch (error) {
      return new DataResponse(Result.Fail, "error saving to important", error);
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
