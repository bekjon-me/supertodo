import type { Ref } from "vue";
import { withTokenInstance } from "./axios";
import { PROJECTS_URL } from "./urls";
import type { Todo } from "~/models/todo";

export const addTodo = async (newTodo: Ref<Todo>, id: string, todos: Ref<Todo[]>) => {
    const res = await withTokenInstance.post(`${PROJECTS_URL + id}/tasks/`, newTodo.value);
    todos.value.push(res.data);
};

export const getTodo = async (id: string, todoId: string) => {
    const res = await withTokenInstance.get(`${PROJECTS_URL + id}/tasks/${todoId}/`);
    return res.data;
};

export const getTodos = async (id: string | string[]) => {
    const res = await withTokenInstance.get(`${PROJECTS_URL + id}/tasks/`);
    return res.data;
};

export const deleteTodo = async (id: string, todoId: string) => {
    await withTokenInstance.delete(`${PROJECTS_URL + id}/` + `tasks/${todoId}/`);
};

export const updateTodo = async (
    todo: Todo,
    id: string | string[],
    todoId: string | string[],
) => {
    return await withTokenInstance.patch(`${PROJECTS_URL + id}/tasks/${todoId}/`, todo);
};
