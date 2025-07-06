import firebase from "firebase/compat/app";
import { db } from "../../../../shared/config/firebaseConfig";
import { User, convertGender } from "../../domain/models/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { FormData } from "../../application//hooks/useSignupForm";
import bcrypt from "bcryptjs";

export class UserRepositoryFirebase implements UserRepository {
  async register(form: FormData): Promise<void> {
    const uid = form.id;
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(form.password, salt);

    await db.collection("accounts").doc(uid).set({
      uid,
      email: form.id,
      passwordHash,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    await db
      .collection("userProfiles")
      .doc(uid)
      .set({
        uid,
        name: form.name,
        age: Number(form.age),
        gender: 1,
        area: Number(form.region),
        intro: form.bio,
        availableDays: [],
        availableTimeStart: 0,
        availableTimeEnd: 0,
        personality: form.personality,
        partySize: Number(form.participants),
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
  }

  async verifyUserCredentials(id: string, password: string): Promise<boolean> {
    const doc = await db.collection("accounts").doc(id).get();
    if (!doc.exists) return false;

    const data = doc.data() as { passwordHash: string };
    return bcrypt.compareSync(password, data.passwordHash);
  }

  async search({
    age,
    gender,
    region,
  }: {
    age?: string;
    gender?: string;
    region?: string;
  }): Promise<User[]> {
    let query: firebase.firestore.Query<firebase.firestore.DocumentData> =
      db.collection("userProfiles");

    if (age) {
      const [min, max] = age.split("-").map(Number);
      query = query.where("age", ">=", min).where("age", "<=", max);
    }
    if (gender) {
      query = query.where("gender", "==", parseInt(gender));
    }
    if (region) {
      query = query.where("area", "==", parseInt(region));
    }

    const snapshot = await query.get();

    // 外部定義されたareaMstもインフラ層で取得するのが理想（省略）
    return snapshot.docs.map((doc) => {
      const p = doc.data();
      return {
        name: p.name,
        age: String(p.age),
        region: "", // area名をどう解決するかは別途設計
        intro: p.intro,
        image: p.imageURL || "",
        availableDays: p.availableDays,
        availableTimeStart: p.availableTimeStart,
        availableTimeEnd: p.availableTimeEnd,
        personality: p.personality,
        maxPeople: p.partySize,
        gender: convertGender(p.gender),
      };
    });
  }
}
