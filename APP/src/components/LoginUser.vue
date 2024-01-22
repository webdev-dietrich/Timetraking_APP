<template>
  <div>
    <div class="login_element" :class="{ is_active: reg}">
      <form class="auth_element" @submit.prevent="handleLogin">
        <label for="username">Username</label>
        <input v-model="credentials.username" type="text" name="username" id="username" />

        <label for="password">Password</label>
        <input v-model="credentials.password" type="password" name="password" id="password" />

        <button type="submit">Login</button>
      </form>
    </div>
    <div class="login_element" :class="{ is_active: !reg}">
      <form class="auth_element" @submit.prevent="handleRegister">
        <label for="username">Username</label>
        <input v-model="register.username" type="text" name="username" id="username" />

        <label for="firstname">Vorname</label>
        <input v-model="register.firstname" type="text" name="firstname" id="firstname" />

        <label for="lastname">Nachname</label>
        <input v-model="register.lastname" type="text" name="lastname" id="lastname" />

        <label for="password">Password</label>
        <input v-model="register.password" type="password" name="password" id="password" />

        <button type="submit">Registrieren</button>
      </form>
    </div>
    <div
    class="auth_tab_item"
        :class="{ is_active: !reg }"
        @click.prevent="reg = false"
      >
      Zurück zum Login
      </div>
      <div
      class="auth_tab_item"
        :class="{ is_active: reg }"
        @click.prevent="reg = true"
      >
      Einen neuen User registrieren
      </div>
  </div>
</template>

<script setup>
import { reactive, ref} from 'vue'
import { useUserStore } from '@/stores/users'

const userStore = useUserStore()

const reg = ref(false);

const credentials = reactive({
  username: '',
  password: ''
})

const register = reactive({
  username: '',
  firstname: '',
  lastname: '',
  password: ''
})

const handleLogin = () => {
  userStore.loginUser(credentials.username, credentials.password)
}

const handleRegister = () => {
  userStore.registerUser(register.username, register.firstname, register.lastname, register.password)
}
</script>

<style scoped>
.is_active {
  display: none;
}

.auth_element {

  display: flex;
  flex-direction: column;
  
  margin-block: 1rem;
  height: 20rem;
  justify-content: center;
}

.auth_element input {
  margin-bottom: 1rem;
}

.auth_element button {
  all: unset;
  padding: 0.5rem 1rem;
  background: #4e4e4e;
  border-radius: 0.25rem;
  width: fit-content;
  cursor: pointer;
}

.auth_tab_item {
  margin-block: 1rem;
  width: fit-content;
  cursor: pointer;
  padding: 0.5rem 1rem;
  background: #4e4e4e;
  border-radius: 0.25rem;
}
</style>