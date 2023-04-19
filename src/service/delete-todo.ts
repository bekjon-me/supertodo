import { withTokenInstance } from './axios'
import { toast } from 'vue3-toastify'
import { PROJECTS_URL } from './urls'

export const deleteTodo = async (id: string, todoId: string, toggleConfirmation: () => void) => {
    const deleteFn = async() => {
        await withTokenInstance.delete(PROJECTS_URL + id + '/' + 'tasks/' + todoId + '/')
    }

  try {
    toast.promise(
        deleteFn(),
        {
            pending: "Deleting...",
            success: "The todo has been deleted",
            error: "Something went wrong"
        }
    )
  } catch (err: any) {
    console.log(err)
    if (err.response?.data.name) {
      toast.error(err.response.data.name[0])
    }
  } finally {
    toggleConfirmation()
  }
}
