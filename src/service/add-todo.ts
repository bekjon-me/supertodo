import { withTokenInstance } from './axios'
import { PROJECTS_URL } from './urls'
import { toast } from 'vue3-toastify'
import type { Todo } from '~/models/todo'
import type { Ref } from 'vue'

export const addTodo = async (newTodo: Ref<Todo>, id: string, file: Ref<File | null>, todos: Ref<Todo[]>, toggleModal: () => void) => {

  if (newTodo.value.beginning >= newTodo.value.completion) {
    toast.error('The beginning date must be earlier than the completion date')
    return
  }

  if (todos.value.find((todo) => todo.title === newTodo.value.title)) {
    toast.error('The task with this name already exists')
    return
    }

    const addFN = async() => {
        const res = await withTokenInstance.post(PROJECTS_URL + id + '/tasks/', newTodo.value)
        let attached_file_id = null
        const formData = new FormData()
        formData.append('attached_file', file.value as File)
    
        try {
          const res2 = await withTokenInstance.post(
            PROJECTS_URL + id + '/tasks/' + res.data.ptid + '/files/',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          )
          attached_file_id = res2.data.tfid
        } catch (error) {
          console.log(error)
        }
    
        const task = {
          ...res.data,
          attached_files: [
            {
              tfid: attached_file_id
            }
          ]
        }
    
        todos.value.push(task)
        file.value = null
    
        newTodo.value = {
          title: '',
          beginning: new Date(),
          completion: new Date(),
          importance: '',
          description: '',
          attached_files: [],
          current_status: ''
        }

    }

  try {
    toast.promise(addFN(), {
        pending: 'Creating task...',
        success: 'Task has been created',
        error: 'Error creating task'
        })

  } catch (err: any) {
    console.log(err)
    if (err.response?.data.name) {
      toast.error(err.response.data.name[0])
    }
    if (err.response?.data.beginning) {
      console.log(err.response.data.beginning[0])
    }
    if (err.response?.data.importance) {
      console.log(err.response.data.importance[0])
    }
  } finally {
    toggleModal()
  }
}
