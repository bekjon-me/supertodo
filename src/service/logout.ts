import { toast } from "vue3-toastify";
import { withTokenInstance } from "./axios";
import {  LOGOUT_USER_URL } from "./urls";

export const logout = async () => {
    const logoutFN = async () => {
         await withTokenInstance.post(LOGOUT_USER_URL)
        }

    try {
        toast.promise(logoutFN(), {
            pending: 'Logging out...',
            success: 'User has been logged out',
            error: 'Something went wrong'
            })
      } catch (error: any) {
        console.log(error)
      } 
};
