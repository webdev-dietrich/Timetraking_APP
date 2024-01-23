<template>
  <header>
    <nav class="navbar is-info is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <p class="navbar-item is-size-4">
          Timetracking APP
        </p>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu" :class="{ 'is-active': isNavbarActive }" id="navbarBasicExample">
        <div class="navbar-start">
          <RouterLink class="navbar-item" to="/" @click="closeNavbar">Home</RouterLink>
          <RouterLink v-if="userStore.userIsLoaded" class="navbar-item" to="/summary" @click="closeNavbar">Summary</RouterLink>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-link" v-if="userStore.userIsLoaded" @click="logout">Logout</a>
              <a class="button is-link" v-else @click="login">Login</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <main>
    <div class="container mt-6">
      <RouterView/>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from './stores/users'
import router from './router';

const userStore = useUserStore()
const isNavbarActive = ref(false);

onMounted(() => {
  userStore.initUser();
})

const login = () => {
  closeNavbar()
  router.replace('/');
}

const logout = () => {
  userStore.logoutUser();
  closeNavbar()
}

const closeNavbar = () => {
  isNavbarActive.value = false;
}

document.addEventListener('DOMContentLoaded', () => {
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  $navbarBurgers.forEach(el => {
    el.addEventListener('click', () => {
      isNavbarActive.value = !isNavbarActive.value;
    });
  });
});
</script>