<template>
  <header>
    <div class="wrapper">
      <nav>
        <div class="nav_main">
          <RouterLink class="nav_element" to="/">Home</RouterLink>
          <RouterLink v-if="userStore.userIsLoaded" class="nav_element" to="/summary"
            >Summary</RouterLink
          >
        </div>
        <div class="nav_right">
          <button v-if="userStore.userIsLoaded" class="nav_element" @click="logout">Logout</button>
          <button v-else class="nav_element" @click="login">Login</button>
        </div>
      </nav>
    </div>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from './stores/users'

const userStore = useUserStore()

onMounted(() => {
  userStore.initUser();
})

</script>
