import { create } from 'zustand'
import { UserType, TodoStore, TaskType } from './types'
import { getCategories } from './api';

export const useUserStore = create<UserType>(() => ({
  token: null,
  refresh_token: null,
  resource_owner: null,
  //logOutUser: () => set(() => {user: null})
}))

export function userData(data: UserType) {
  useUserStore.setState((prevState) => ({
    ...prevState,
    token: data.token,
    refresh_token: data.refresh_token,
    resource_owner: {
      ...prevState.resource_owner,
      created_at: data.resource_owner?.created_at,
      email: data.resource_owner?.email,
      id: data.resource_owner?.id,
      updated_at: data.resource_owner?.updated_at,
    },
  }));
}

export const useTodoStore = create<TodoStore>((set) => ({
  categories: null,
  setCategories: (categories) => set({ categories }),
  setTasks: (tasks) => {
    set((state) => {
        const tasksByCategory: Record<number, TaskType[]> = {}
        tasks.forEach((task) => {
          if (tasksByCategory[task.category_id]) {
            tasksByCategory[task.category_id].push(task)
          } else {
            tasksByCategory[task.category_id] = [task]
          }
        })
        const updatedCategories = state.categories?.map((category) => {
          if (tasksByCategory[category.id]) {
            return {
              ...category,
              tasks: tasksByCategory[category.id],
            }
          }
          return category
        })

        return { categories: updatedCategories ?? null };
      })
    },
  deleteCategory: (categoryId) => {
    set((state) => ({
      categories: state.categories?.filter((category) => category.id !== categoryId)
    }))
  },
  deleteTask: (categoryId, taskId) => {
    set((state) => ({
      categories: state.categories?.map((category) => {
        if(category.id === categoryId) {
          return {
            ...category,
            tasks: category.tasks?.filter((task) => task.id !== taskId) ?? []
          }
        }
        return category
      }) ?? null
    }))
  },
  setCategory: (newCategory) => {
    set((state) => ({
      categories: state.categories ? [...state.categories, newCategory] : [newCategory]
    }))
  },
  setTask: (categoryId, newTask) => {
    set((state) => ({
      categories: state.categories?.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            tasks: category.tasks ? [...category.tasks, newTask] : [newTask]
          }
        }
        return category
      }) ?? null
    }))
  }
}))
