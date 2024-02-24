import { query, collection, where, getDocs } from "firebase/firestore";
import DataResponse, { Result } from "../DataResponse";
import { db } from "../firebase";

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
}
