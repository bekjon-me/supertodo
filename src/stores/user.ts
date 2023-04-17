import {  defineStore } from "pinia";
import { User } from "~/models/user";

export const useUserStore = defineStore("user", () => {
  const router = useRouter()
  const user = ref<User | null>(null)

  const createUser = (createdUser: User) => {
    user.value = createdUser
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('tokens')
    router.push('/login')
  }

  return {
    user,
    createUser,
    logout
  }
});


