import { useEffect, useState } from "react";
import { db } from "../../../../shared/config/firebaseConfig";
import { Area } from "../../../../shared/domain/repositories/AreaRepository";

export type FormData = {
  id: string;
  password: string;
  confirmPassword: string;
  name: string;
  age: string;
  region: string;
  bio: string;
  availability: string;
  personality: string;
  participants: string;
};

export type SignupFormProps = ReturnType<typeof useSignupForm>;

export const useSignupForm = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>({
    id: "",
    password: "",
    confirmPassword: "",
    name: "",
    age: "",
    region: "",
    bio: "",
    availability: "",
    personality: "",
    participants: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [areas, setAreas] = useState<Area[]>([]);

  const validate = (current: number) => {
    const errs: Partial<FormData> = {};
    if (current === 1) {
      if (!form.id) errs.id = "ID is required";
      if (!form.password) errs.password = "Password is required";
      if (!form.confirmPassword) errs.confirmPassword = "Confirm required";
      if (form.password && form.password.length < 7)
        errs.password = "Min 7 chars";
      if (form.password !== form.confirmPassword)
        errs.confirmPassword = "Mismatch";
    } else if (current === 2) {
      if (!form.name) errs.name = "Name required";
      if (!form.age) errs.age = "Age required";
      if (!form.region) errs.region = "Region required";
    }
    return errs;
  };

  const handleNext = () => {
    const errs = validate(step);
    setErrors(errs);
    if (Object.keys(errs).length === 0) setStep((s) => s + 1);
  };

  const handleBack = () => setStep((s) => s - 1);

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors(validate(step));
  };

  useEffect(() => {
    db.collection("areaMst")
      .get()
      .then((snapshot) => {
        setAreas(snapshot.docs.map((doc) => doc.data() as Area));
      });
  }, []);

  return {
    step,
    form,
    errors,
    areas,
    handleNext,
    handleBack,
    handleChange,
    setForm,
    setErrors,
  };
};
