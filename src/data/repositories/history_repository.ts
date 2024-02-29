import {
  query,
  collection,
  where,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import DataResponse from "../DataResponse";
import { db } from "../firebase";
import KeywordModel from "@/domain/models/keyword_model";
import { AIModel, Result } from "@/types";

export default class HistoryRepository {
  async readHistory(email: string): Promise<DataResponse> {
    const history: {}[] = [];
    try {
      const querySnapshot = await getDocs(collection(db, "users", email, "history"));
      querySnapshot.forEach((doc) => {
        history.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      return new DataResponse(Result.Success, "history read success", history);
    } catch (error) {
      return new DataResponse(Result.Fail, "history read failed", error);
    }
  }

  async writeHistory(
    email: string,
    keyword: string,
    definition: string,
    // example: string,
    // origin: string,
    model: AIModel
  ): Promise<DataResponse> {
    try {
      const newHistory = new KeywordModel(
        new Date(),
        keyword,
        definition,
        // example,
        // origin,
        model
      ).toObject();

      const docRef = doc(collection(db, "users", email, "history"));
      await setDoc(docRef, newHistory);
      return new DataResponse(Result.Success, "history write success", {});
    } catch (error) {
      return new DataResponse(Result.Fail, "history write failed", error);
    }
  }

  async modifyHistory(email: string, keywordID: string, modificationContent: {}): Promise<DataResponse> {
    try {
      const docRef = doc(db, "users", email, "history", keywordID);
      await updateDoc(docRef, modificationContent);

      return new DataResponse(Result.Success, "history modify success", {});
    } catch (error) {
      return new DataResponse(Result.Fail, "history modify failed", error);
    }
  }

  async deleteHistory(email: string, keywordID: string): Promise<DataResponse> {
    try {
      await deleteDoc(doc(db, "users", email, "history", keywordID));
      return new DataResponse(Result.Success, "history modify success", {});
    } catch (error) {
      return new DataResponse(Result.Fail, "history modify failed", error);
    }
  }
}
