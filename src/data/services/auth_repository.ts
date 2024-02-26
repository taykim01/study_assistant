import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import DataResponse from "../DataResponse";
import { db } from "../firebase";
import { Result } from "@/types";

export default class AuthRepository {
  async login(email: string, password: string): Promise<DataResponse> {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      return new DataResponse(
        Result.Success,
        "로그인 성공",
        docSnap.data()
      );
    } catch (error) {
      return new DataResponse(Result.Fail, "로그인 실패", );
    }
  }

  async logOut() {
    const auth = getAuth();
    try {
        await signOut(auth);
        return new DataResponse(
            Result.Success,
            "logout success",
            {}
        );
    } catch (error) {
        return new DataResponse(
            Result.Fail,
            "logout failed",
            error
        );
    }
  }
}
