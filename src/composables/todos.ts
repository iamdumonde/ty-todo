import type { Todo } from '@/@types'
import { ref } from 'vue'

const todos = ref(null)

export const useTodos = () => {
  //récupération de tâches
  async function getTodos( ) {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id}`)
    })
  }

  async function getTodo(todo: Todo) {}

  async function addTodo(todo: Todo) {}

  async function changeTodo(todo: Todo) {}

  async function removeTodo(todo: Todo) {}

  return { 
    getTodos, 
    getTodo, 
    addTodo, 
    changeTodo, 
    removeTodo }
}
