export interface User {
  name: string;
  age: string;
  region: string;
  intro: string;
  image: string;
  availableDays: number[];
  availableTimeStart: number;
  availableTimeEnd: number;
  personality: string;
  maxPeople: number;
  gender: string;
}

export function convertGender(gender: number): string {
  switch (gender) {
    case 1:
      return "男性";
    case 2:
      return "女性";
    case 3:
      return "その他";
    default:
      return "";
  }
}
