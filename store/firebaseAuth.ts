import { AuthEnum } from "../interfaces/Firebase";

export const getFirebaseAuthApi = (apiUsage: keyof typeof AuthEnum): string => {
  return `https://identitytoolkit.googleapis.com/v1/accounts:${AuthEnum[apiUsage]}?key=${process.env.FIREBASE_API_KEY}`;
};
