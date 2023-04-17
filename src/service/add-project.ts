import { Ref } from 'vue'
import { withTokenInstance } from './axios'
import { PROJECTS_URL } from './urls'
import { toast } from 'vue3-toastify'

export const addProject = async (name: string, projects: Ref<any[]>) => {
  if (projects.value.find((project) => project.name === name)) {
    toast.error('The project with this name already exists')
    return
  }

  try {
    const response = await withTokenInstance.post(PROJECTS_URL, { name })
    projects.value.push(response.data)
    toast.success('The project has been created')
  } catch (error: any) {
    console.log(error)
    if (error.response?.data.name) {
      toast.error(error.response.data.name[0])
    }
  }
}
