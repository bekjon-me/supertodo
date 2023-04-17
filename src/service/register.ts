import { nonTokenInstance  } from './axios'
import { AUTH_USER_URL } from './urls'
import { toast } from 'vue3-toastify'
import {useUserStore} from '../stores/user'

type Payload = {
  username: string
  email: string
  password1: string
  password2: string
}

export const handleRegister = async (values: Payload) => {
  const { createUser } = useUserStore()
  const router = useRouter()

  try {
    const res = await nonTokenInstance.post(AUTH_USER_URL, values)
    console.log(res.data)
    const tokens = {
      access: res.data.access_token,
      refresh: res.data.refresh_token
    }
    localStorage.setItem('tokens', JSON.stringify(tokens))
    createUser(res.data.user)
    router.push('/')
    toast.success('You have successfully registered')

    // const res2 = await withTokenInstance.get(PROJECTS_URL)
  } catch (error: any) {
    console.log(error)
    if (error.response?.data.username) {
      toast.error(error.response.data.username[0])
    }
    if (error.response?.data.email) {
      toast.error(error.response.data.email[0])
    }
    if (error.response?.data.password1) {
      toast.error(error.response.data.password1[0])
    }
    if (error.response?.data.non_field_errors) {
      toast.error(error.response.data.non_field_errors[0])
    }
  } 
}
