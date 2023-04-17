import { nonTokenInstance  } from './axios'
import { LOGIN_USER_URL } from './urls'
import { useUserStore } from '../stores/user'
import { toast } from 'vue3-toastify'

export const handleLogin = async (values: any) => {
  const { createUser } = useUserStore()
  const router = useRouter()

  try {
    const res = await nonTokenInstance.post(LOGIN_USER_URL, values)
    console.log(res.data)
    const tokens = {
      access: res.data.access_token,
      refresh: res.data.refresh_token
    }
    localStorage.setItem('tokens', JSON.stringify(tokens))
    createUser(res.data.user)
    router.push('/')
    toast.success('You have successfully logged in')

    // const res2 = await withTokenInstance.get(PROJECTS_URL)
    // setProjects(res2.data)
  } catch (error: any) {
    console.log(error)
    if (error.response?.data.email) {
      toast.error(error.response.data.email[0])
    }
    if (error.response?.data.password) {
      toast.error(error.response.data.password[0])
    }
    if (error.response?.data.non_field_errors) {
      toast.error(error.response.data.non_field_errors[0])
    }
  } 
}
