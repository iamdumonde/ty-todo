import { computed, ref } from 'vue'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '@/configs/firebase'
import { useAuth as useVueUseAuth } from '@vueuse/firebase'
import type { UserData } from '@/@types'


const user = ref<UserData>(null)
const isAuthenticated = computed<boolean>(() => !!user.value );

const useAuth = () => {
  
  //get User
  async function getUser(): UserData {
    if (user.value) {
      // si l'user est déjà authentifié
      return user;
    } else {
      // on cherchera à authentifier à travers fireBase
      const {user} = await useVueUseAuth(auth);
      return user;
    }
  }

  // initialize user
  async function initUser(){
    user.value = await getUser();
  }


  // login
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error: any) {
      const errorCode = error.code
      const errorMessage = error.message
      console.error(`Error ${errorCode} : ${errorMessage}`)
    }
  }
  // register
  const register = async (email: string, password: string) => {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
    user.value = userCredentials.user
  }
  // logout
  const logout = async () => {
    console.log('logout please')
    try {
      await signOut(auth);
      user.value = null;
      console.log(user.value)
    } catch (error: any) {
      if(error.message){
        console.error(`Error logging out: ${error.message}`)
      }
    }
  }

  return {
    user,
    isAuthenticated,
    initUser,
    login,
    register,
    logout
  }
}

export { useAuth }
