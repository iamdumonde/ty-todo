<template>
  <div>
    <TodoHeader @add-todo="addTodo" />

    <TodoMain :taches="filteredTodos" @delete-todo="deleteTodo" @update-todo="updateTodo" @edit-todo="editTodo"
      @toggle-all-input="toggleAllInput" />

    <TodoFooter :todos="todos" @delete-completed="deleteCompleted" />

    <!-- <pre> {{  { todos} }}</pre> -->
  </div>
</template>

<script setup lang="ts">
import TodoHeader from '@/components/TodoHeader.vue'
import TodoMain from '@/components/TodoMain.vue'
import TodoFooter from '@/components/TodoFooter.vue'
import type { Todo } from '@/@types'
import { computed, onMounted } from 'vue'
import { nanoid } from 'nanoid'
import { useRoute } from 'vue-router'
import { useTodos } from '@/composables/todos'


// 
const { createTodo, changeTodo, getTodo, getTodos, removeTodo, firebaseTodos } = useTodos()

const todos = computed(() => firebaseTodos.value);

// router
const route = useRoute()

//
onMounted(async () => {
  await getTodos();
})


// objet de filtre
const filters = computed(() => {
  return {
    all: todos,
    waiting: todos.value.filter((todo) => !todo.complete),
    completed: todos.value.filter((todo) => todo.complete)
  }
})

const waitingTodos = computed<Todo[]>(() => filters.value.waiting)
const completedTodos = computed<Todo[]>(() => filters.value.completed)

const filteredTodos = computed(() => {
  switch (route.name) {
    case 'waiting':
      return waitingTodos.value
    case 'completed':
      return completedTodos.value
    default:
      return todos.value
  }
})

async function addTodo(value: string) {
  if (value.trim().length === 0) {
    return // Do nothing if the input is empty or whitespace.
  }
  await createTodo(value);

}

async function deleteTodo(todo: Todo) {
  await deleteTodo(todo);
}

async function updateTodo(todo: Todo, completedValue: boolean) {
  changeTodo(todo, {
    ...todo,
    complete: completedValue
  });
}

function editTodo(todo: Todo, titleValue: string) {
  changeTodo(todo, {
    ...todo,
    title: titleValue
  });
}

function deleteCompleted(): void {
  todos.value = todos.value.filter((todo) => !todo.complete)
}

function toggleAllInput(value: boolean) {
  todos.value.forEach((todo) => {
    todo.complete = value
  })
}
</script>

<style scoped></style>
