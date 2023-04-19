import { withTokenInstance } from './axios'
import { toast } from 'vue3-toastify'
import { USER_URL } from './urls'
import { User } from '~/models/user'
import { Ref } from 'vue'

export const updateUser = async (modalUser: User, user: Ref<User>, toggleModal: () => void) => {

    const updateFN = async () => {
        const res = await withTokenInstance.patch(USER_URL, modalUser)
        user.value = res.data
    }

  try {
    toast.promise(updateFN(), {
        pending: 'Updating...',
        success: 'User has been updated',
        error: 'Something went wrong'
        })
  } catch (err: any) {
    console.log(err)
    if (err.response?.data.name) {
      toast.error(err.response.data.name[0])
    }
  } finally {
    toggleModal()
  }
}
