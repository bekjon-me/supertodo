import { withTokenInstance } from './axios'
import { toast } from 'vue3-toastify'
import { PROJECTS_URL } from './urls'

export const updateProject = async (id: number, name:string, toggleModal: () => void, editLocal: (id: number, name:string) => void) => {

    const updateFN = async () => {
        const res = await withTokenInstance.patch(PROJECTS_URL + id + '/', {name})
        editLocal(id, res.data.name)
        console.log(editLocal(id, res.data.name));  
        
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
