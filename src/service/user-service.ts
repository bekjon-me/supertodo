import { nonTokenInstance, withTokenInstance } from "./axios";
import { AUTH_USER_URL, LOGIN_USER_URL, LOGOUT_USER_URL, USER_URL } from "./urls";
import type { RegisterPayload, User } from "~/models/user";

export const handleRegister = async (values: RegisterPayload): Promise<any> => {
    return await nonTokenInstance.post(AUTH_USER_URL, values);
};

export const handleLogin = async (values: any): Promise<any> => {
    return await nonTokenInstance.post(LOGIN_USER_URL, values);
};

export const handleLogout = async () => {
    await withTokenInstance.post(LOGOUT_USER_URL);
};

export const handleGetUser = async () => {
    return await withTokenInstance.get(USER_URL);
};

export const handleUpdateUser = async (modalUser: User) => {
    return await withTokenInstance.patch(USER_URL, modalUser);
};
