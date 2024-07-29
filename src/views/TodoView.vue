<template>
  <div>
    <!-- <button @click.prevent="handlelogout()">Se déconnecter</button> -->
    <!-- TodosComponent -->
    <TodosComponent />
    <!-- /TodosComponent -->
     <!-- <pre> {{ {user} }} </pre> -->
  </div>
</template>

<script setup lang="ts">
import TodosComponent from '@/components/TodosComponent.vue'
// import { useAuth } from '@/composables/auth';
// import { useRouter } from 'vue-router';

// const {logout, user } = useAuth()
// const router = useRouter()
// async function handlelogout(){
//   await logout();
//   router.push({name: 'login'});
// }
</script>

<style scoped></style>
