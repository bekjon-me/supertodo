import { withTokenInstance } from './axios'
import { toast } from 'vue3-toastify'
import { PROJECTS_URL } from './urls'
import type { Todo } from '~/models/todo'
import type { Ref } from 'vue'

export const updateTodo = async (
  todo: Todo,
  actualTodo: Ref<Todo | undefined>,
  id: string | string[],
  todoId: string | string[],
  toggleModal: () => void,
) => {

    const updateFN = async () => {
        const res = await withTokenInstance.patch(PROJECTS_URL + id + '/tasks/' + todoId + '/', todo)
        actualTodo.value = { ...actualTodo.value, ...res.data }
    }

  try {
    toast.promise(updateFN(), {
        pending: 'Updating...',
        success: 'Todo has been updated',
        error: {
            render: (err: any) => {
                return err.response.data.detail
            }
        }
        })
  } finally {
    toggleModal()
  }
}
