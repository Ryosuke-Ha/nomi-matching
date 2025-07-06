const UID_KEY = "uid";
const AUTH_KEY = "auth";

export const saveUidToSession = (uid: string): void => {
  sessionStorage.setItem(UID_KEY, uid);
};

export const getUidFromSession = (): string => {
  return sessionStorage.getItem(UID_KEY) || "";
};

export const saveAuthToSession = (auth: boolean): void => {
  sessionStorage.setItem(AUTH_KEY, String(auth));
};

export const getAuthFromSession = (): boolean => {
  return sessionStorage.getItem(AUTH_KEY) === "true";
};
