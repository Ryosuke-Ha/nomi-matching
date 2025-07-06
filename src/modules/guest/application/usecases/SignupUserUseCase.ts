import { FormData } from "../hooks/useSignupForm";
import { db } from "../../../../shared/config/firebaseConfig";
import firebase from "firebase/compat/app";
import bcrypt from "bcryptjs";

export class SignupUserUseCase {
  constructor(private readonly repo: any) {} // 今回は未使用

  async execute(form: FormData): Promise<void> {
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
}
