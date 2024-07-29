import type { Todo } from '@/@types'
import { db } from '@/configs/firebase'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore'
import { ref } from 'vue'

const todos = ref<Todo[]>([]);

export const useTodos = () => {
  //récupération de tâches
  async function getTodos() {
    const querySnapshot = await getDocs(collection(db, 'todos'))
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });

  }

  async function getTodo(todo: Todo) {
    const docRef = doc(db, 'todos', todo.id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data())
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!')
    }
  }

  //Gestion de tâches
  async function addTodo(todoTitle: string) {
    try {
      await addDoc(collection(db, 'todos'), {
        title: todoTitle,
        complete: false,
        createdAt: serverTimestamp(),
        updatedAt: null
      })
    } catch (error) {
      console.error(error);
    }
  }

  //Modification de tâches
  async function changeTodo(todo: Todo) {
    await updateDoc(doc(db, 'todos', todo.id), {
      title: todo.title,
      complete: todo.complete,
      updatedAt: serverTimestamp(),
    })
  }

  //Suppression de tâches
  async function removeTodo(todo: Todo) {
    await deleteDoc(doc(db, 'todos', todo.id))
  }

  return {
    todos,
    getTodos,
    getTodo,
    addTodo,
    changeTodo,
    removeTodo
  }
}
