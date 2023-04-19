import { Ref } from "vue";
import { withTokenInstance } from "./axios";
import {  USER_URL } from "./urls";
import { User } from "~/models/user";

export const getUser = async (user: Ref<User>, toggleLoader: () => void) => {

    try {
        toggleLoader()
        const response = await withTokenInstance.get(USER_URL)
        user.value = response.data
      } catch (error: any) {
        if (error?.response?.status === 404) {
            console.log('404');
        //   await router.push(id as string)
        }
        console.log(error)
      } finally {
        toggleLoader()
      }
};
