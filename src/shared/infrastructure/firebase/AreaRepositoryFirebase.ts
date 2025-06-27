import { AreaRepository, Area } from "../../domain/repositories/AreaRepository";
import { db } from "../../config/firebaseConfig";

export class AreaRepositoryFirebase implements AreaRepository {
  async fetchAll(): Promise<Area[]> {
    const snapshot = await db.collection("areaMst").get();
    return snapshot.docs.map((doc) => doc.data() as Area);
  }
}
