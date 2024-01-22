<template>
  <div>
    <LoginUserVue v-if="!userStore.userIsLoaded" />
    <TimeTrakingVue v-else />
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/users'
import LoginUserVue from '@/components/LoginUser.vue'
import TimeTrakingVue from '@/components/TimeTraking.vue'

const userStore = useUserStore()
</script>
