<template>
<div class="hero mt-6">
  <form class="box mt-5" @submit.prevent="handleLogin" :class="{ is_active: reg}">
    <div class="field">
      <label class="label">Username</label>
      <div class="control">
        <input class="input" v-model="credentials.username" type="text" name="auth_username" id="auth_username" autocomplete="none" placeholder="username">
      </div>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input class="input" v-model="credentials.password" type="password" name="auth_password" id="auth_password" autocomplete="none" placeholder="********">
      </div>
    </div>

    <button class="button is-primary" type="submit">Login</button>
  </form>

  <form class="box mt-5" @submit.prevent="handleRegister" :class="{ is_active: !reg}">
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input class="input" v-model="register.username" type="text" name="reg_username" id="reg_username" autocomplete="none" placeholder="username">
      </div>
    </div>

    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input class="input" v-model="register.firstname" type="text" name="reg_firstname" id="reg_firstname" autocomplete="none" placeholder="Max">
      </div>
    </div>

    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input class="input" v-model="register.lastname" type="text" name="reg_lastname" id="reg_lastname" autocomplete="none" placeholder="Mustermann">
      </div>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input class="input" v-model="register.password" type="password" name="reg_password" id="reg_password" autocomplete="none" placeholder="********">
      </div>
    </div>

    <button class="button is-primary" type="submit">Login</button>
  </form>

   <div
    class="control"
        :class="{ is_active: !reg }"
        @click.prevent="reg = false"
      >
      <button class="button is-link">
      Zurück zum Login</button>
      </div>
      <div
      class="control"
        :class="{ is_active: reg }"
        @click.prevent="reg = true"
      >
      <button class="button is-link">
      Einen neuen User registrieren</button>
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
</style>