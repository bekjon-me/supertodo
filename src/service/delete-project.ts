import { withTokenInstance } from './axios'
import { toast } from 'vue3-toastify'
import { PROJECTS_URL } from './urls'

export const deleteProject = async (id: number, toggleConfirmation: () => void, removeDeleted: (id:number) => void) => {
    const deleteFN = async() => {
        await withTokenInstance.delete(PROJECTS_URL + id + '/')
    }
    console.log(removeDeleted);
    
  try {
    toast.promise(
        deleteFN(),
        {
            pending: "Deleting...",
            success: "The project has been deleted",
            error: {
                render: (err: any) => {
                    return err.response.data.detail
                }
            }
        }
    )
        removeDeleted(id)
  }  finally {
    toggleConfirmation()
  }
}
