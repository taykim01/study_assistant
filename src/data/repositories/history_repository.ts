import {
  query,
  collection,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import DataResponse from "../DataResponse";
import { db } from "../firebase";
import KeywordModel from "@/domain/models/keyword_model";
import { AIModel, Result } from "@/types";

export default class HistoryRepository {
  async readHistory(email: string): Promise<DataResponse> {
    const history: {}[] = [];
    try {
      const q = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
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
    example: string,
    origin: string,
    model: AIModel
  ): Promise<DataResponse> {
    try {
      const newHistory = new KeywordModel(
        email,
        new Date(),
        keyword,
        definition,
        example,
        origin,
        model
      ).toObject();

      const docRef = doc(collection(db, "history"));
      await setDoc(docRef, newHistory);
      return new DataResponse(Result.Success, "history write success", {});
    } catch (error) {
      return new DataResponse(Result.Fail, "history write failed", error);
    }
  }
}
